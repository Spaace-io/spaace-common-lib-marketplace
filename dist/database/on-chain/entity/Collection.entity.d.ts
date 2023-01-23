import { BaseEntity } from 'typeorm';
import { Order } from '../..';
export declare enum CollectionType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
export declare class CollectionAttribute {
    trait: string;
    value: string;
    count: string;
}
export declare class Collection extends BaseEntity {
    address: string;
    type: CollectionType;
    name?: string;
    symbol?: string;
    imageUrl?: string;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl?: string;
    description?: string;
    deployedAt?: Date;
    deployer?: string;
    attributes?: CollectionAttribute[];
    volume24h: string;
    change24h: string;
    volume7d: string;
    change7d: string;
    volume30d: string;
    change30d: string;
    volume: string;
    floorPrice?: string;
    floorChange24h: string;
    floorChange7d: string;
    floorChange30d: string;
    totalSupply: string;
    ownerCount: string;
    lastImport?: Date;
    importItems: boolean;
    buyNow?: Order;
    sellNow?: Order;
}
