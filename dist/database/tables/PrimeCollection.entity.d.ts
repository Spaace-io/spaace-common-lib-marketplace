import { BaseEntity } from 'typeorm';
export declare class PrimeCollectionEntity extends BaseEntity {
    collectionAddress: string;
    isPrime: boolean;
    name: string | null;
    imageUrl: string | null;
    updatedAt: Date | null;
}
