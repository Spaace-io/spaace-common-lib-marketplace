import { BaseEntity } from 'typeorm';
import { OrderType } from '../tables';
export declare class Order extends BaseEntity {
    hash: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
    type: OrderType;
    price: string;
    startingPrice: string | null;
    currency: string;
    startTime: Date;
    endTime: Date | null;
    counter: string;
    signature: string;
    cancelTxHash: string | null;
    cancelLogIdx: string | null;
    cancelTimestamp: Date | null;
    active: boolean;
}
