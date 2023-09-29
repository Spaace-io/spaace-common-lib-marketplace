import { BaseEntity } from 'typeorm';
import { Marketplace } from './Order.entity';
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
    marketplace: Marketplace;
    timestamp: Date;
}
