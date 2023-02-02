import { BaseEntity } from 'typeorm';
import { CollectionType } from '..';
import { Order } from '../..';
export declare class ItemAttribute {
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
    lastImport?: Date;
    attributes?: ItemAttribute[];
    type?: CollectionType;
    buyNow?: Order;
    sellNow?: Order;
}
