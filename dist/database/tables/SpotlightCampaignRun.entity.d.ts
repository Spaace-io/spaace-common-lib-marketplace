import { BaseEntity } from 'typeorm';
import { SpotlightCampaign } from './SpotlightCampaign.entity';
import { SpotlightCampaignRunCollection } from './SpotlightCampaignRunCollection.entity';
export declare class SpotlightCampaignRun extends BaseEntity {
    id: string;
    campaignId: string;
    campaign: SpotlightCampaign;
    seasonNumber: string;
    collectionAddress: string;
    validFrom: Date;
    validTo: Date;
    isCurrent: boolean;
    multiplier: number;
    createdAt: Date;
    runCollections: SpotlightCampaignRunCollection[];
}
