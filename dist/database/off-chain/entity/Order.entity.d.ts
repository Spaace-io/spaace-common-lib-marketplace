import { BaseEntity } from "typeorm";
export declare class Order extends BaseEntity {
    id: string;
    item: string;
    isAsk: boolean;
    price: number;
    currency: string;
    endTime: string;
    startTime: string;
    collection: string;
    hash: string;
    signer: string;
    signature: string;
    strategy: string;
    tokenId: string;
    created_at: Date;
    updated_at: Date;
}
