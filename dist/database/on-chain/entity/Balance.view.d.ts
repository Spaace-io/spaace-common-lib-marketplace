import { BaseEntity } from 'typeorm';
import { Item } from '.';
export declare class Balance extends BaseEntity {
    collection: string;
    tokenId: string;
    user: string;
    balance: string;
    item?: Item;
}
