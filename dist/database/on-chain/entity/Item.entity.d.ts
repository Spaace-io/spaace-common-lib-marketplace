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
    title: string | null;
    description: string | null;
    tokenUri: string | null;
    medias: ItemMedia[] | null;
    rarityRanking: string | null;
    rarityScore: string | null;
    attributes: ItemAttribute[] | null;
    lastImport: Date | null;
    collection: Collection;
    buyNow: Order | null;
    sellNow: Order | null;
    lastSale: Sale | null;
    ownerCount: string;
    owners: Balance[];
}
