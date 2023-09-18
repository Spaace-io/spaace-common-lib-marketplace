import { BaseEntity } from 'typeorm';
export declare class ItemAttribute extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    trait: string;
    value: string;
}
