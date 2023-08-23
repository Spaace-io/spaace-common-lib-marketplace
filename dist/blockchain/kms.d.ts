import { Provider, TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumberish, Bytes, Signer, TypedDataField, ethers } from 'ethers';
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
    connect(provider: Provider): GoogleCloudKMSSigner;
    _signTypedData(domain: {
        name?: string;
        version?: string;
        chainId?: BigNumberish;
        verifyingContract?: string;
        salt?: ArrayLike<number> | string;
    }, types: Record<string, Array<TypedDataField>>, value: Record<string, unknown>): Promise<string>;
}
export declare const rewardsDistributorSigner: GoogleCloudKMSSigner;
export declare const marketMakingSigner: GoogleCloudKMSSigner;
