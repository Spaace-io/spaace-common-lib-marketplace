import { BaseEntity } from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';
import { User } from './User.entity';
import { PartnerChestTier } from './PartnerChestTier.entity';
export declare class PartnerChestUserRun extends BaseEntity {
    id: string;
    userAddress: string;
    user: User;
    campaignRunId: string;
    campaignRun: SpotlightCampaignRun;
    assignedTierId: string;
    assignedTier: PartnerChestTier;
    assignedAt: Date;
    holdingsValueEth: string | null;
    holdingsValueUsd: string | null;
    snapshot: Record<string, unknown> | null;
}
