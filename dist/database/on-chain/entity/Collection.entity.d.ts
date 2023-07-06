import { BaseEntity } from 'typeorm';
import { Order } from '../..';
export declare enum CollectionType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155"
}
export declare enum CollectionLinkType {
    CUSTOM = "custom",
    TWITTER = "twitter",
    DISCORD = "discord",
    INSTAGRAM = "instagram",
    TELEGRAM = "telegram",
    MEDIUM = "medium"
}
export declare class CollectionLink {
    type: CollectionLinkType;
    url: string;
}
export declare class CollectionAttributeValue {
    collectionAddress: string;
    trait: string;
    value: string;
    count: string;
    buyNow: Order;
    sellNow: Order;
}
export declare class CollectionAttribute {
    collectionAddress: string;
    trait: string;
    values: CollectionAttributeValue[];
}
export declare class Collection extends BaseEntity {
    address: string;
    type: CollectionType;
    name: string | null;
    symbol: string | null;
    imageUrl: string | null;
    active: boolean;
    verified: boolean;
    explicit: boolean;
    bannerUrl: string | null;
    description: string | null;
    deployedAt: Date | null;
    deployer: string | null;
    attributes: CollectionAttribute[] | null;
    links: CollectionLink[];
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
    floorPrice: string | null;
    floorChange1h: string;
    floorChange6h: string;
    floorChange24h: string;
    floorChange7d: string;
    floorChange30d: string;
    saleCount: string;
    saleCount1h: string;
    saleCount6h: string;
    saleCount24h: string;
    saleCount7d: string;
    saleCount30d: string;
    totalSupply: string;
    ownerCount: string;
    lastImport: Date | null;
    listedCount: string;
    buyNow: Order | null;
    sellNow: Order | null;
    notable: boolean;
}
