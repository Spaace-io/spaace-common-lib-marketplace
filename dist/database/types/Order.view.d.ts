import { BaseEntity } from 'typeorm';
import { Marketplace, OrderType } from '../enums';
export declare class Order extends BaseEntity {
    hash: string;
    userAddress: string;
    collectionAddress: string;
    tokenIds: string[] | null;
    type: OrderType;
    marketplace: Marketplace;
    price: string;
    perUnitPrice: string;
    startingPrice: string | null;
    currency: string;
    marketplaceFeeBps: number;
    marketplaceFeeReceiver: string | null;
    royaltiesBps: number;
    startingRoyalties: string | null;
    royaltiesReceiver: string | null;
    startTime: Date;
    endTime: Date | null;
    counter: string;
    salt: string;
    zone: string;
    conduitKey: string;
    protocolAddress: string;
    signature: string;
    cancelTxHash: string | null;
    cancelLogIdx: string | null;
    cancelTimestamp: Date | null;
    fulfillQuantity: string;
    remainingQuantity: string;
    active: boolean;
}
