import { BaseEntity } from 'typeorm';
import { ItemMedia } from '..';
export declare class Item extends BaseEntity {
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
