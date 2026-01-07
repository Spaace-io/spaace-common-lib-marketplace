import { BaseEntity } from 'typeorm';
export declare enum SpotlightCampaignEventType {
    NEW_RUN = "NEW_RUN",
    ACTIVATE = "ACTIVATE",
    DEACTIVATE = "DEACTIVATE",
    UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN",
    UPDATE_RUN = "UPDATE_RUN"
}
export declare class SpotlightCampaignEvent extends BaseEntity {
    id: string;
    campaignId: string;
    runId: string | null;
    type: SpotlightCampaignEventType;
    note: string | null;
    payload: Record<string, unknown>;
    createdAt: Date;
}
