import { BaseEntity } from 'typeorm';
import { Order } from '../..';
export declare class ItemAttribute {
    trait: string;
    value: string;
}
export declare class ItemMedia {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class ItemRarity {
    ranking: number;
    score: number;
}
export declare class Item extends BaseEntity {
    collection: string;
    tokenId: string;
    title?: string;
    description?: string;
    tokenUri?: string;
    attributes?: ItemAttribute[];
    medias?: ItemMedia[];
    rarity?: ItemRarity;
    buyNow?: Order;
    sellNow?: Order;
}
