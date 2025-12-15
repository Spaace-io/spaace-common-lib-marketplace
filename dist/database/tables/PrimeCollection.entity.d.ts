import { BaseEntity } from 'typeorm';
export declare class PrimeCollectionEntity extends BaseEntity {
    id: number;
    collectionAddress: string;
    tokenIdRange: string | null;
    isPrime: boolean;
    name: string | null;
    imageUrl: string | null;
    volume24h: number | null;
    volume7d: number | null;
    volume30d: number | null;
    volumeAllTime: number | null;
    updatedAt: Date | null;
}
