import { BaseEntity } from "typeorm";
import { User } from "..";
export declare class Order extends BaseEntity {
    id: string;
    user: User;
    collection: string;
    item?: string;
    isAsk: boolean;
    price: string;
    currency: string;
    startTime: Date;
    endTime: Date;
    signature: string;
}
