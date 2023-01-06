import { BaseEntity } from "typeorm";
export declare class Order extends BaseEntity {
    hash: string;
    user: string;
    collection: string;
    tokenId?: string;
    isAsk: boolean;
    price: string;
    currency: string;
    startTime: Date;
    endTime: Date;
    signature: string;
}
