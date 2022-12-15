import { BaseEntity } from 'typeorm';
import { Item } from './Item.entity';
export declare class CollectionAttribute {
    trait: string;
    type: string;
    count: string;
}
export declare class CollectionVolume {
    volume24h: number;
    change24h: number;
    volume7d: number;
    change7d: number;
    volume30d: number;
    change30d: number;
    volume: number;
}
export declare class CollectionFloor {
    floorPrice: number;
    floorChange24h: number;
    floorChange7d: number;
    floorChange30d: number;
}
export declare class Collection extends BaseEntity {
    id: string;
    items: Item[];
    deployedOwner: string;
    name: string;
    countOwner: string;
    symbol: string;
    totalSupply: number;
    tokenType: string;
    abi: object[];
    imageUrl: string;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl: string;
    description: string;
    highOffer: string;
    attributes: CollectionAttribute[];
    created_at: Date;
    updated_at: Date;
    volume: CollectionVolume;
    floor: CollectionFloor;
}
