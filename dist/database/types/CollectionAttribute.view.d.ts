import { BaseEntity } from 'typeorm';
export declare class CollectionAttribute extends BaseEntity {
    collectionAddress: string;
    traitHash: string;
    trait: string;
    valueHash: string;
    value: string;
    itemCount: string;
    listedCount: string;
}
