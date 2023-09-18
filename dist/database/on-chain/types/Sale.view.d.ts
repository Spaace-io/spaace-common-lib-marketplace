import { BaseEntity } from 'typeorm';
export declare class Sale extends BaseEntity {
    txHash: string;
    logIdx: string;
    orderHash: string;
    collectionAddress: string;
    tokenId: string;
    amount: string;
    from: string;
    to: string;
    price: string;
    currency: string;
    timestamp: Date;
}
