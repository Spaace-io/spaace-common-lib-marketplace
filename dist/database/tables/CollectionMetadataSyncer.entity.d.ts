import { BaseEntity } from 'typeorm';
export declare class CollectionMetadataSyncer extends BaseEntity {
    address: string;
    visited: number;
    proceed: boolean;
}
