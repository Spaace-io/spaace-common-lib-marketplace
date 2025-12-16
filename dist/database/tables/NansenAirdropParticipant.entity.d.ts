import { BaseEntity } from 'typeorm';
import { NansenTier, NansenRewardType } from '../enums/NansenAirdrop.enum';
export declare class NansenAirdropParticipant extends BaseEntity {
    id: number;
    walletAddress: string;
    nansenTier: NansenTier;
    rewardType: NansenRewardType;
    multiplierValue: number | null;
    multiplierActivatedAt: Date | null;
    multiplierExpiresAt: Date | null;
    requiresTweet: boolean;
    tweetUrl: string | null;
    tweetVerifiedAt: Date | null;
    eligibilityCheckedAt: Date;
    nansenApiResponse: Record<string, unknown> | null;
    createdAt: Date;
}
