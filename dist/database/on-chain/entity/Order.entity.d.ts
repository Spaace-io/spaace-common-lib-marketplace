import { BaseEntity } from 'typeorm';
import { Item, Collection } from '.';
export declare class Order extends BaseEntity {
    hash: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
    isAsk: boolean;
    price: string;
    currency: string;
    startTime: Date;
    endTime: Date | null;
    counter: string;
    signature: string;
    cancelTxHash: string;
    cancelLogIdx: string;
    cancelTimestamp: Date;
    collection?: Collection | null;
    item?: Item | null;
}
