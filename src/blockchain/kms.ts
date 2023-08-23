import * as crypto from 'crypto';
import { Ber, BerReader } from 'asn1';
import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { _TypedDataEncoder } from '@ethersproject/hash';
import { KeyManagementServiceClient } from '@google-cloud/kms';
import { BigNumberish, Bytes, Signer, TypedDataField, ethers } from 'ethers';

export class GoogleCloudKMSSigner extends Signer {
  private readonly _kms = new KeyManagementServiceClient();
  private readonly _cryptoKeyName: string;
  private _cryptoKeyVersion?: string;
  private _address?: string;

  constructor(
    cryptoKeyName: string,
    cryptoKeyVersion?: string,
    address?: string,
    provider?: Provider,
  ) {
    super();

    // Allow passing cryptoKeyVersion as first argument and leaving out the 2nd
    if (/\/cryptoKeyVersions\/[a-zA-Z0-9_-]{1,63}$/.test(cryptoKeyName)) {
      cryptoKeyVersion ??= cryptoKeyName;
      cryptoKeyName = cryptoKeyName.substring(
        0,
        cryptoKeyName.lastIndexOf('/cryptoKeyVersions/'),
      );
    }

    if (
      cryptoKeyVersion !== undefined &&
      !cryptoKeyVersion.startsWith(`${cryptoKeyName}/cryptoKeyVersions/`)
    ) {
      throw new Error(
        `Key and key version mismatch: ${cryptoKeyName}, ${cryptoKeyVersion}`,
      );
    }

    this._cryptoKeyName = cryptoKeyName;
    this._cryptoKeyVersion = cryptoKeyVersion;
    this._address = address;
    ethers.utils.defineReadOnly(this, 'provider', provider);
  }

  private async _getCryptoKeyVersion() {
    if (this._cryptoKeyVersion !== undefined) return this._cryptoKeyVersion;

    const [versions] = await this._kms.listCryptoKeyVersions({
      parent: this._cryptoKeyName,
      filter: 'state = "ENABLED" AND algorithm = "EC_SIGN_SECP256K1_SHA256"',
      pageSize: 1,
    });

    if (versions.length === 0)
      throw new Error(`Invalid KMS key: ${this._cryptoKeyName}`);
    if (versions[0].name === undefined || versions[0].name === null)
      throw new Error(
        `Invalid KMS key version: ${JSON.stringify(versions[0])}`,
      );

    return (this._cryptoKeyVersion = versions[0].name);
  }

  private async _sign(digest: Uint8Array) {
    const cryptoKeyVersion = await this._getCryptoKeyVersion();

    // Google Cloud KMS does not support keccak256, only regular SHA256.
    // So, we need to compute the hash and send that instead of the data.
    const [{ signature: derSignature }] = await this._kms.asymmetricSign({
      name: cryptoKeyVersion,
      digest: {
        sha256: digest,
      },
    });

    if (derSignature === undefined || derSignature === null)
      throw new Error(`Failed to sign message with key: ${cryptoKeyVersion}`);

    // Google Cloud KMS returns the signature in DER format (for Bitcoin), but
    // Ethereum uses RLP, so it needs to be converted, which is what the rest of
    // this function attempts to do.
    const derBuffer =
      typeof derSignature === 'string'
        ? Buffer.from(derSignature, 'hex')
        : Buffer.from(derSignature);

    // See https://www.rfc-editor.org/rfc/rfc3279#section-2.2.3
    // The asn1 library does not support DER (yet), so we use BER and manually
    // read the correct tags, assuming it always matches the right OID.
    const derReader = new BerReader(derBuffer);
    derReader.readSequence();
    const rawR = Buffer.from(derReader.readString(Ber.Integer, true) ?? '');
    const rawS = Buffer.from(derReader.readString(Ber.Integer, true) ?? '');

    // Because DER imposes signed integers, if the first bit of either r or s is
    // one, the DER sequence can contain integers of 33 bytes instead of 32:
    // they are padded with a 0x00 for the first bit to go back to zero.
    // So, we use hexValue which strips this additional padding, otherwise
    // ethers.utils.splitSignature will complain that r or s are too long.
    const r = ethers.utils.hexZeroPad(ethers.utils.hexValue(rawR), 32);
    const s = ethers.utils.hexZeroPad(ethers.utils.hexValue(rawS), 32);

    const address = await this.getAddress();

    // DER signatures do not include v, which allows to recover the public key.
    // With some Ethereum signing libraries, we can use v = 27 + (rawS[0] >> 7).
    // But Google Cloud KMS does not set the first bit of s accordingly, so we
    // have to bruteforce it. Thankfully, checking only 2 values is enough.
    for (const v of [27, 28]) {
      const signature = ethers.utils.joinSignature({ r, s, v });

      if (ethers.utils.recoverAddress(digest, signature) === address)
        return signature;
    }

    // Can happen in some extremely rare cases, where v is 29 or 30.
    throw new Error(
      `Invalid signature: ${ethers.utils.hexlify(
        derBuffer,
      )} for digest ${ethers.utils.hexlify(digest)}`,
    );
  }

  override async getAddress() {
    if (this._address !== undefined) return this._address;

    const cryptoKeyVersion = await this._getCryptoKeyVersion();

    const [{ pem }] = await this._kms.getPublicKey({
      name: cryptoKeyVersion,
    });

    if (pem === undefined || pem === null) {
      throw new Error(
        `Failed to get PEM public key for KMS key: ${cryptoKeyVersion}`,
      );
    }

    const publicKey = crypto.createPublicKey({
      key: pem,
      format: 'pem',
    });

    const buffer = publicKey.export({
      format: 'der',
      type: 'spki',
    });

    // The first 23 or so bytes of the SPKI format are metadata, and the last 65
    // are the raw public key which we need to hash to get the corresponding
    // Ethereum address.
    // We could (probably?) decode this with X.509 or ASN.1 instead of slicing.
    return (this._address = ethers.utils.computeAddress(buffer.slice(-65)));
  }

  override async signMessage(message: string | Bytes) {
    const digest = ethers.utils.arrayify(ethers.utils.hashMessage(message));
    return this._sign(digest);
  }

  override async signTransaction(
    transaction: ethers.utils.Deferrable<TransactionRequest>,
  ): Promise<string> {
    const resolved = await ethers.utils.resolveProperties(transaction);

    const address = await this.getAddress();
    if (resolved.from !== undefined && resolved.from !== address) {
      throw new Error(
        `Invalid from address: ${resolved.from} (expected ${address})`,
      );
    }

    const serialized = ethers.utils.serializeTransaction(
      resolved as ethers.utils.UnsignedTransaction,
    );

    const digest = ethers.utils.arrayify(ethers.utils.keccak256(serialized));
    return await this._sign(digest); // TODO: https://ethereum.stackexchange.com/a/107498
  }

  override connect(provider: Provider): Signer {
    return new GoogleCloudKMSSigner(
      this._cryptoKeyName,
      this._cryptoKeyVersion,
      this._address,
      provider,
    );
  }

  // Seaport Signer
  async _signTypedData(
    domain: {
      name?: string;
      version?: string;
      chainId?: BigNumberish;
      verifyingContract?: string;
      salt?: ArrayLike<number> | string;
    },
    types: Record<string, Array<TypedDataField>>,
    value: Record<string, unknown>,
  ): Promise<string> {
    const populated = await _TypedDataEncoder.resolveNames(
      domain,
      types,
      value,
      async (name: string) => {
        const address = await this.provider?.resolveName(name);

        if (!address) throw new Error('Failed to resolve ENS');

        return address;
      },
    );

    return this._sign(
      ethers.utils.arrayify(
        _TypedDataEncoder.hash(populated.domain, types, populated.value),
      ),
    );
  }
}

export const rewardsDistributorSigner = new GoogleCloudKMSSigner(
  process.env.REWARDS_DISTRIBUTOR_KMS_KEY_NAME ??
    'REWARDS_DISTRIBUTOR_KMS_KEY_NAME',
);

export const marketMakingSigner = new GoogleCloudKMSSigner(
  process.env.MARKET_MAKING_KMS_KEY_NAME ?? 'MARKET_MAKING_KMS_KEY_NAME',
);
