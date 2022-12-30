import { BaseEntity } from "typeorm";
export declare class Order extends BaseEntity {
    orderHash: string;
    user: string;
    collection: string;
    item?: string;
    isAsk: boolean;
    price: string;
    currency: string;
    startTime: Date;
    endTime: Date;
    signature: string;
}
