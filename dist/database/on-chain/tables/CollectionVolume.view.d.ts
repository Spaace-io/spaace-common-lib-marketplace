import { BaseEntity } from 'typeorm';
export declare class CollectionVolume extends BaseEntity {
    address: string;
    volume1h: string;
    volumeChange1h: string;
    volume6h: string;
    volumeChange6h: string;
    volume24h: string;
    volumeChange24h: string;
    volume7d: string;
    volumeChange7d: string;
    volume30d: string;
    volumeChange30d: string;
    volume: string;
}
