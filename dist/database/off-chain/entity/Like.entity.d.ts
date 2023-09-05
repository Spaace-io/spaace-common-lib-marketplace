import { BaseEntity } from 'typeorm';
export declare class Like extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
}
