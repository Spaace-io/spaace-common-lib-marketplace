import { BaseEntity } from 'typeorm';
export declare class Balance extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    userAddress: string;
    balance: string;
}
