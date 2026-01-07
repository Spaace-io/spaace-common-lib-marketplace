import { BaseEntity } from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';
export declare class PartnerChestTier extends BaseEntity {
    id: string;
    campaignRunId: string;
    campaignRun: SpotlightCampaignRun;
    tierNumber: number;
    thresholdEth: string;
    label: string | null;
    active: boolean;
}
