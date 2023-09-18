import { BaseEntity } from 'typeorm';
export declare class ItemAttributeEntity extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    trait: string;
    value: string;
}
