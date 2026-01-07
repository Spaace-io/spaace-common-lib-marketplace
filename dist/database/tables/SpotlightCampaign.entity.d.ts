import { BaseEntity } from 'typeorm';
import { Quest } from './Quest.entity';
export declare class SpotlightCampaign extends BaseEntity {
    id: string;
    collectionAddress: string;
    collectionName: string;
    seasonNumber: string;
    questId: string;
    quest: Quest;
    validFrom: Date;
    validTo: Date;
    active: boolean;
}
