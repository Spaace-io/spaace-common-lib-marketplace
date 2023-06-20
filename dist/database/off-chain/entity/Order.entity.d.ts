import { BaseEntity } from 'typeorm';
import { Item } from '../../on-chain';
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
    item?: Item;
}
