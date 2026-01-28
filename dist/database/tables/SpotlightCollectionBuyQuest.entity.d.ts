import { BaseEntity } from 'typeorm';
import { Quest } from './Quest.entity';
export declare class SpotlightCollectionBuyQuest extends BaseEntity {
    id: string;
    seasonNumber: string;
    collectionAddress: string;
    collectionName: string;
    questId: string;
    quest: Quest;
    createdAt: Date;
    updatedAt: Date;
}
