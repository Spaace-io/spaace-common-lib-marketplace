import { BaseEntity } from 'typeorm';
import { Collection, Item } from '../../on-chain';
export declare class Order extends BaseEntity {
    hash: string;
    user: string;
    collectionAddress: string;
    tokenId?: string;
    isAsk: boolean;
    price: string;
    currency: string;
    startTime: Date;
    endTime?: Date;
    counter: string;
    signature: string;
    collection?: Collection;
    item?: Item;
}
