import { BaseEntity } from 'typeorm';
import { Balance, CollectionType, Sale } from '..';
import { Order } from '../..';
export declare class ItemAttribute extends BaseEntity {
    collection: string;
    tokenId: string;
    trait: string;
    value: string;
}
export declare class ItemMedia {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class Item extends BaseEntity {
    collection: string;
    tokenId: string;
    title?: string;
    description?: string;
    tokenUri?: string;
    medias?: ItemMedia[];
    rarityRanking?: string;
    rarityScore?: string;
    attributes?: ItemAttribute[];
    lastImport?: Date;
    type: CollectionType;
    buyNow?: Order;
    sellNow?: Order;
    lastSale?: Sale;
    ownerCount: string;
    owners: Balance[];
}
