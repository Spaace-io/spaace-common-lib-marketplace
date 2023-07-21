import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare class LoyaltyPointsLoyaltyRewardClaim {
    readonly __typename = "LoyaltyPointsLoyaltyRewardClaim";
    constructor(amount: string);
    amount: string;
}
export declare class StakingBonusLoyaltyRewardClaim {
    readonly __typename = "StakingBonusLoyaltyRewardClaim";
    constructor(amount: string);
    amount: string;
}
export declare class SpaaceTokensLoyaltyRewardClaim {
    readonly __typename = "SpaaceTokensLoyaltyRewardClaim";
    constructor(amount: string);
    amount: string;
}
export declare class CosmeticLoyaltyRewardClaim {
    readonly __typename = "CosmeticLoyaltyRewardClaim";
    constructor(id: string);
    id: string;
}
export declare const LoyaltyRewardClaim: LoyaltyPointsLoyaltyRewardClaim | StakingBonusLoyaltyRewardClaim | SpaaceTokensLoyaltyRewardClaim | CosmeticLoyaltyRewardClaim;
export declare class UserSeasonRankClaim extends BaseEntity {
    userAddress: string;
    seasonNumber: number;
    rank: LoyaltyRank;
    rewards: (typeof LoyaltyRewardClaim)[];
    timestamp: Date;
}
