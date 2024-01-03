import { BaseEntity } from 'typeorm';
export declare enum Marketplace {
    SPAACE = "SPAACE",
    OPENSEA = "OPENSEA",
    BLUR = "BLUR"
}
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
}
