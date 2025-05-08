import { BaseEntity } from 'typeorm';
export declare class PrimeCollectionEntity extends BaseEntity {
    collectionAddress: string;
    isPrime: boolean;
    updatedAt: Date | null;
}
