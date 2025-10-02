import { BaseEntity } from 'typeorm';
import { Marketplace } from '../enums';
export type FeeItemBase = {
    kind?: string;
    rawAmount?: string;
    source?: string | null;
    recipient?: string | null;
    bps?: number;
};
export declare class SaleEntity extends BaseEntity {
    id: string;
    txHash: string;
    logIdx: string;
    collectionAddress: string;
    tokenId: string;
    orderHash: string;
    amount: string;
    from: string;
    to: string;
    price: string;
    perUnitPrice: string;
    currency: string;
    marketplace: Marketplace;
    timestamp: Date;
    feeBreakdown: FeeItemBase[];
}
