import { BaseEntity } from 'typeorm';
export declare class CartItem extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    tokenId: string;
}
