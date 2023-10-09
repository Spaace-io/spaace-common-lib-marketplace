import { BaseEntity } from 'typeorm';
export declare class ItemAttribute extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    traitHash: string;
    trait: string;
    valueHash: string;
    value: string;
}
