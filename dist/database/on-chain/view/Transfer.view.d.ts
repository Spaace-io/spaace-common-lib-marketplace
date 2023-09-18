import { BaseEntity } from 'typeorm';
export declare class Transfer extends BaseEntity {
    txHash: string;
    logIdx: string;
    from: string;
    to: string;
    collectionAddress: string;
    tokenId: string;
    amount: string;
    timestamp: Date;
}
