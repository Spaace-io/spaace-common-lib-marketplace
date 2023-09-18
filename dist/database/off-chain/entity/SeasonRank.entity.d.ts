import { BaseEntity } from 'typeorm';
export declare enum LoyaltyRank {
    BRONZE_5 = "BRONZE_5",
    BRONZE_4 = "BRONZE_4",
    BRONZE_3 = "BRONZE_3",
    BRONZE_2 = "BRONZE_2",
    BRONZE_1 = "BRONZE_1",
    SILVER_5 = "SILVER_5",
    SILVER_4 = "SILVER_4",
    SILVER_3 = "SILVER_3",
    SILVER_2 = "SILVER_2",
    SILVER_1 = "SILVER_1",
    GOLD_5 = "GOLD_5",
    GOLD_4 = "GOLD_4",
    GOLD_3 = "GOLD_3",
    GOLD_2 = "GOLD_2",
    GOLD_1 = "GOLD_1",
    PLATINUM_5 = "PLATINUM_5",
    PLATINUM_4 = "PLATINUM_4",
    PLATINUM_3 = "PLATINUM_3",
    PLATINUM_2 = "PLATINUM_2",
    PLATINUM_1 = "PLATINUM_1",
    DIAMOND_5 = "DIAMOND_5",
    DIAMOND_4 = "DIAMOND_4",
    DIAMOND_3 = "DIAMOND_3",
    DIAMOND_2 = "DIAMOND_2",
    DIAMOND_1 = "DIAMOND_1"
}
export declare enum LoyaltyRewardType {
    LOYALTY_POINTS = "LOYALTY_POINTS",
    STAKING_BONUS = "STAKING_BONUS",
    SPAACE_TOKENS = "SPAACE_TOKENS",
    COSMETIC = "COSMETIC"
}
export declare class LoyaltyPointsLoyaltyReward {
    readonly type = LoyaltyRewardType.LOYALTY_POINTS;
    constructor(min: string, max: string);
    min: string;
    max: string;
}
export declare class StakingBonusLoyaltyReward {
    readonly type = LoyaltyRewardType.STAKING_BONUS;
    constructor(min: string, max: string);
    min: string;
    max: string;
}
export declare class SpaaceTokensLoyaltyReward {
    readonly type = LoyaltyRewardType.SPAACE_TOKENS;
    constructor(min: string, max: string);
    min: string;
    max: string;
}
export declare class CosmeticLoyaltyReward {
    readonly type = LoyaltyRewardType.COSMETIC;
    constructor(ids: string[]);
    ids: string[];
}
export declare const LoyaltyReward: LoyaltyPointsLoyaltyReward | StakingBonusLoyaltyReward | SpaaceTokensLoyaltyReward | CosmeticLoyaltyReward;
export declare class SeasonRank extends BaseEntity {
    seasonNumber: string;
    rank: LoyaltyRank;
    threshold: string;
    rewards: (typeof LoyaltyReward)[];
}
