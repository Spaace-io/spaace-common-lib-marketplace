import { BaseEntity } from 'typeorm';
import { Item } from '../..';
export declare class HiddenItem extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    tokenId: string;
    item?: Item;
}
