import { BaseEntity } from "typeorm";
import { Item } from "./Item.entity";
export declare class Sale extends BaseEntity {
    txHash: string;
    logIdx: number;
    orderHash: string;
    item: Item;
    amount: string;
    from: string;
    to: string;
    price: string;
    currency: string;
    timestamp: Date;
}
