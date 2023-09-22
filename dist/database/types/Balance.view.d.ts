import { BaseEntity } from 'typeorm';
import { Item } from '../..';
export declare class Balance extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    userAddress: string;
    balance: string;
    item: Item;
}
