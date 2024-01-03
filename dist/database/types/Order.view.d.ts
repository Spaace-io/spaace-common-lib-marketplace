import { BaseEntity } from 'typeorm';
import { Marketplace, OrderType } from '..';
export declare class Order extends BaseEntity {
    hash: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
    type: OrderType;
    marketplace: Marketplace;
    price: string;
    startingPrice: string | null;
    currency: string;
    royalties: string;
    startingRoyalties: string | null;
    royaltiesReceiver: string | null;
    startTime: Date;
    endTime: Date | null;
    counter: string;
    signature: string;
    cancelTxHash: string | null;
    cancelLogIdx: string | null;
    cancelTimestamp: Date | null;
    active: boolean;
}
