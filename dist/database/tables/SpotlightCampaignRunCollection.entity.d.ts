import { BaseEntity } from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';
import { Quest } from './Quest.entity';
export declare class SpotlightCampaignRunCollection extends BaseEntity {
    id: string;
    runId: string;
    run: SpotlightCampaignRun;
    seasonNumber: string;
    collectionAddress: string;
    collectionName: string;
    isPrimary: boolean;
    questId: string;
    quest: Quest;
    createdAt: Date;
}
