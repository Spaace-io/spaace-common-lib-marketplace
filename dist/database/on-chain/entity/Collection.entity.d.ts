import { BaseEntity } from 'typeorm';
import { Item } from './Item.entity';
export declare enum CollectionType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
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
    address: string;
    type: CollectionType;
    name?: string;
    symbol?: string;
    deployer?: string;
    imageUrl?: string;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl?: string;
    description?: string;
    deployedAt?: Date;
    items?: Item[];
    abi?: object[];
    attributes?: CollectionAttribute[];
    highOffer?: string;
    totalSupply?: number;
    countOwner?: string;
    volume?: CollectionVolume;
    floor?: CollectionFloor;
}
