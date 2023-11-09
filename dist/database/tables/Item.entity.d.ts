import { BaseEntity } from 'typeorm';
export declare class ItemMedia {
    raw: string;
    thumbnail: string;
    gateway: string;
}
export declare class ItemEntity extends BaseEntity {
    collectionAddress: string;
    tokenId: string;
    title: string | null;
    description: string | null;
    tokenUri: string | null;
    decimals: string | null;
    medias: ItemMedia[] | null;
    rarityRanking: string | null;
    rarityScore: string | null;
    lastImport: Date | null;
}
