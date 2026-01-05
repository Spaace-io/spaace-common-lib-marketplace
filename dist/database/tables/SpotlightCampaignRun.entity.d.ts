import { BaseEntity } from 'typeorm';
import { SpotlightCampaign } from './SpotlightCampaign.entity';
export declare class SpotlightCampaignRun extends BaseEntity {
    id: string;
    campaignId: string;
    campaign: SpotlightCampaign;
    validFrom: Date;
    validTo: Date;
    isCurrent: boolean;
    createdAt: Date;
}
