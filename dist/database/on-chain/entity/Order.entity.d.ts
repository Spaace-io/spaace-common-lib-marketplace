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
    cancelTxHash: string | null;
    cancelLogIdx: string | null;
    cancelTimestamp: Date | null;
    collection?: Collection | null;
    item?: Item | null;
}
