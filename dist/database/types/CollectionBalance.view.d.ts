import { BaseEntity } from 'typeorm';
export declare class CollectionBalance extends BaseEntity {
    collectionAddress: string;
    userAddress: string;
    balance: string;
    itemCount: string;
}
