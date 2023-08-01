import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { Bytes, Signer, ethers } from 'ethers';
export declare class GoogleCloudKMSSigner extends Signer {
    private readonly _kms;
    private readonly _cryptoKeyName;
    private _cryptoKeyVersion?;
    private _address?;
    constructor(cryptoKeyName: string, cryptoKeyVersion?: string, address?: string, provider?: Provider);
    private _getCryptoKeyVersion;
    private _sign;
    getAddress(): Promise<string>;
    signMessage(message: string | Bytes): Promise<string>;
    signTransaction(transaction: ethers.utils.Deferrable<TransactionRequest>): Promise<string>;
    connect(provider: Provider): Signer;
}
export declare const rewardsDistributorSigner: GoogleCloudKMSSigner;
