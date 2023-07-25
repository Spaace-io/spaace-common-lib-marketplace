import { BaseEntity } from 'typeorm';
import { LoyaltyRank, LoyaltyRewardType } from '.';
export declare class LoyaltyPointsLoyaltyRewardClaim {
    readonly type = LoyaltyRewardType.LOYALTY_POINTS;
    constructor(amount: string);
    amount: string;
}
export declare class StakingBonusLoyaltyRewardClaim {
    readonly type = LoyaltyRewardType.STAKING_BONUS;
    constructor(amount: string);
    amount: string;
}
export declare class SpaaceTokensLoyaltyRewardClaim {
    readonly type = LoyaltyRewardType.SPAACE_TOKENS;
    constructor(amount: string);
    amount: string;
}
export declare class CosmeticLoyaltyRewardClaim {
    readonly type = LoyaltyRewardType.COSMETIC;
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
