import { BaseEntity } from 'typeorm';
export declare class HideItem extends BaseEntity {
    user: string;
    collectionAddress: string;
    tokenId: string;
}
