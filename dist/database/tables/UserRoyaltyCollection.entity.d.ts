import { BaseEntity } from 'typeorm';
export declare class UserRoyaltyCollection extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    firstPaidAt: Date;
    totalRoyaltyWei: string;
}
