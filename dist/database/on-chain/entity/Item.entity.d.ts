import { BaseEntity } from 'typeorm';
import { Balance, Collection, Sale } from '..';
import { Order } from '../..';
export declare class ItemAttribute extends BaseEntity {
    collectionAddress: string;
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
    collectionAddress: string;
    tokenId: string;
    title?: string;
    description?: string;
    tokenUri?: string;
    medias?: ItemMedia[];
    rarityRanking?: string;
    rarityScore?: string;
    attributes?: ItemAttribute[];
    lastImport?: Date;
    collection: Collection;
    buyNow?: Order;
    sellNow?: Order;
    lastSale?: Sale;
    ownerCount: string;
    owners: Balance[];
}
