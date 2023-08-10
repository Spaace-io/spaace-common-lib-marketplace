"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.marketMakingSigner = exports.rewardsDistributorSigner = exports.GoogleCloudKMSSigner = void 0;
const crypto = require("crypto");
const asn1_1 = require("asn1");
const kms_1 = require("@google-cloud/kms");
const ethers_1 = require("ethers");
class GoogleCloudKMSSigner extends ethers_1.Signer {
    constructor(cryptoKeyName, cryptoKeyVersion, address, provider) {
        super();
        this._kms = new kms_1.KeyManagementServiceClient();
        // Allow passing cryptoKeyVersion as first argument and leaving out the 2nd
        if (/\/cryptoKeyVersions\/[a-zA-Z0-9_-]{1,63}$/.test(cryptoKeyName)) {
            cryptoKeyVersion !== null && cryptoKeyVersion !== void 0 ? cryptoKeyVersion : (cryptoKeyVersion = cryptoKeyName);
            cryptoKeyName = cryptoKeyName.substring(0, cryptoKeyName.lastIndexOf('/cryptoKeyVersions/'));
        }
        if (cryptoKeyVersion !== undefined &&
            !cryptoKeyVersion.startsWith(`${cryptoKeyName}/cryptoKeyVersions/`)) {
            throw new Error(`Key and key version mismatch: ${cryptoKeyName}, ${cryptoKeyVersion}`);
        }
        this._cryptoKeyName = cryptoKeyName;
        this._cryptoKeyVersion = cryptoKeyVersion;
        this._address = address;
        ethers_1.ethers.utils.defineReadOnly(this, 'provider', provider);
    }
    _getCryptoKeyVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._cryptoKeyVersion !== undefined)
                return this._cryptoKeyVersion;
            const [versions] = yield this._kms.listCryptoKeyVersions({
                parent: this._cryptoKeyName,
                filter: 'state = "ENABLED" AND algorithm = "EC_SIGN_SECP256K1_SHA256"',
                pageSize: 1,
            });
            if (versions.length === 0)
                throw new Error(`Invalid KMS key: ${this._cryptoKeyName}`);
            if (versions[0].name === undefined || versions[0].name === null)
                throw new Error(`Invalid KMS key version: ${JSON.stringify(versions[0])}`);
            return (this._cryptoKeyVersion = versions[0].name);
        });
    }
    _sign(digest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const cryptoKeyVersion = yield this._getCryptoKeyVersion();
            // Google Cloud KMS does not support keccak256, only regular SHA256.
            // So, we need to compute the hash and send that instead of the data.
            const [{ signature: derSignature }] = yield this._kms.asymmetricSign({
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
            const derBuffer = typeof derSignature === 'string'
                ? Buffer.from(derSignature, 'hex')
                : Buffer.from(derSignature);
            // See https://www.rfc-editor.org/rfc/rfc3279#section-2.2.3
            // The asn1 library does not support DER (yet), so we use BER and manually
            // read the correct tags, assuming it always matches the right OID.
            const derReader = new asn1_1.BerReader(derBuffer);
            derReader.readSequence();
            const rawR = Buffer.from((_a = derReader.readString(asn1_1.Ber.Integer, true)) !== null && _a !== void 0 ? _a : '');
            const rawS = Buffer.from((_b = derReader.readString(asn1_1.Ber.Integer, true)) !== null && _b !== void 0 ? _b : '');
            // Because DER imposes signed integers, if the first bit of either r or s is
            // one, the DER sequence can contain integers of 33 bytes instead of 32:
            // they are padded with a 0x00 for the first bit to go back to zero.
            // So, we use hexValue which strips this additional padding, otherwise
            // ethers.utils.splitSignature will complain that r or s are too long.
            const r = ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexValue(rawR), 32);
            const s = ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexValue(rawS), 32);
            const address = yield this.getAddress();
            // DER signatures do not include v, which allows to recover the public key.
            // With some Ethereum signing libraries, we can use v = 27 + (rawS[0] >> 7).
            // But Google Cloud KMS does not set the first bit of s accordingly, so we
            // have to bruteforce it. Thankfully, checking only 2 values is enough.
            for (const v of [27, 28]) {
                const signature = ethers_1.ethers.utils.joinSignature({ r, s, v });
                if (ethers_1.ethers.utils.recoverAddress(digest, signature) === address)
                    return signature;
            }
            // Can happen in some extremely rare cases, where v is 29 or 30.
            throw new Error(`Invalid signature: ${ethers_1.ethers.utils.hexlify(derBuffer)} for digest ${ethers_1.ethers.utils.hexlify(digest)}`);
        });
    }
    getAddress() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._address !== undefined)
                return this._address;
            const cryptoKeyVersion = yield this._getCryptoKeyVersion();
            const [{ pem }] = yield this._kms.getPublicKey({
                name: cryptoKeyVersion,
            });
            if (pem === undefined || pem === null) {
                throw new Error(`Failed to get PEM public key for KMS key: ${cryptoKeyVersion}`);
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
            return (this._address = ethers_1.ethers.utils.computeAddress(buffer.slice(-65)));
        });
    }
    signMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const digest = ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.hashMessage(message));
            return this._sign(digest);
        });
    }
    signTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const resolved = yield ethers_1.ethers.utils.resolveProperties(transaction);
            const address = yield this.getAddress();
            if (resolved.from !== undefined && resolved.from !== address) {
                throw new Error(`Invalid from address: ${resolved.from} (expected ${address})`);
            }
            const serialized = ethers_1.ethers.utils.serializeTransaction(resolved);
            const digest = ethers_1.ethers.utils.arrayify(ethers_1.ethers.utils.keccak256(serialized));
            return yield this._sign(digest); // TODO: https://ethereum.stackexchange.com/a/107498
        });
    }
    connect(provider) {
        return new GoogleCloudKMSSigner(this._cryptoKeyName, this._cryptoKeyVersion, this._address, provider);
    }
}
exports.GoogleCloudKMSSigner = GoogleCloudKMSSigner;
exports.rewardsDistributorSigner = new GoogleCloudKMSSigner((_a = process.env.REWARDS_DISTRIBUTOR_KMS_KEY_NAME) !== null && _a !== void 0 ? _a : 'REWARDS_DISTRIBUTOR_KMS_KEY_NAME');
exports.marketMakingSigner = new GoogleCloudKMSSigner((_b = process.env.MARKET_MAKING_KMS_KEY_NAME) !== null && _b !== void 0 ? _b : 'MARKET_MAKING_KMS_KEY_NAME');
//# sourceMappingURL=kms.js.map