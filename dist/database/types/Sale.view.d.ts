import { BaseEntity } from 'typeorm';
import { Marketplace } from '../enums';
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
    perUnitPrice: string;
    currency: string;
    marketplace: Marketplace;
    timestamp: Date;
}
