import { BaseEntity } from 'typeorm';
export declare class ActiveOrderCached extends BaseEntity {
    hash: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string;
    type: string;
    marketplace: string;
    price: string;
    startingPrice: string;
    currency: string;
    startTime: string;
    endTime: string;
    counter: string;
    signature: string;
    cancelTxHash: string;
    cancelLogIdx: string;
    cancelTimestamp: string;
    royalties: string;
    startingRoyalties: string;
}
