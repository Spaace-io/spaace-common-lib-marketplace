import { BaseEntity } from 'typeorm';
export declare enum OrderType {
    ASK = "ASK",
    BID = "BID",
    ENGLISH_AUCTION = "ENGLISH_AUCTION",
    DUTCH_AUCTION = "DUTCH_AUCTION"
}
export declare class OrderEntity extends BaseEntity {
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
}
