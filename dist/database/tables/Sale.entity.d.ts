import { BaseEntity } from 'typeorm';
export declare class SaleEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    collectionAddress: string;
    tokenId: string;
    orderHash: string;
    amount: string;
    from: string;
    to: string;
    price: string;
    currency: string;
    timestamp: Date;
}
