import { BaseEntity } from 'typeorm';
export declare class PrimeCollectionEntity extends BaseEntity {
    collectionAddress: string;
    isPrime: boolean;
    name: string | null;
    imageUrl: string | null;
    volume24h: number | null;
    volume7d: number | null;
    volume30d: number | null;
    volumeAllTime: number | null;
    updatedAt: Date | null;
}
