import { BaseEntity } from "typeorm";
declare class SaleItem {
    collection: string;
    tokenId: string;
}
export declare class Sale extends BaseEntity {
    txHash: string;
    logIdx: number;
    orderHash: string;
    item: SaleItem;
    amount: string;
    from: string;
    to: string;
    price: string;
    currency: string;
    timestamp: Date;
}
export {};
