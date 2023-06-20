import { BaseEntity } from 'typeorm';
import { Item } from '.';
export declare class Balance extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    user: string;
    balance: string;
    item?: Item;
}
