import { BaseEntity } from 'typeorm';
export declare class BalanceEntity extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    userAddress: string;
    balance: string;
}
