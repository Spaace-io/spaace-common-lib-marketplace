import { BaseEntity } from 'typeorm';
export declare class Like extends BaseEntity {
    id: string;
    userAddress: string;
    collectionAddress: string;
    tokenId: string;
}
