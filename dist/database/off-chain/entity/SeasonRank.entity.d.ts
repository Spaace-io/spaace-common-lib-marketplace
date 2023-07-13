import { UserSeasonRankClaim } from '.';
export declare enum LoyaltyRank {
    BRONZE_5 = "B5",
    BRONZE_4 = "B4",
    BRONZE_3 = "B3",
    BRONZE_2 = "B2",
    BRONZE_1 = "B1",
    SILVER_5 = "S5",
    SILVER_4 = "S4",
    SILVER_3 = "S3",
    SILVER_2 = "S2",
    SILVER_1 = "S1",
    GOLD_5 = "G5",
    GOLD_4 = "G4",
    GOLD_3 = "G3",
    GOLD_2 = "G2",
    GOLD_1 = "G1",
    PLATINUM_5 = "P5",
    PLATINUM_4 = "P4",
    PLATINUM_3 = "P3",
    PLATINUM_2 = "P2",
    PLATINUM_1 = "P1",
    DIAMOND_5 = "D5",
    DIAMOND_4 = "D4",
    DIAMOND_3 = "D3",
    DIAMOND_2 = "D2",
    DIAMOND_1 = "D1"
}
export declare class LoyaltyPointsLoyaltyReward {
    min: string;
    max: string;
}
export declare class StakingBonusLoyaltyReward {
    min: string;
    max: string;
}
export declare class SpaaceTokensLoyaltyReward {
    min: string;
    max: string;
}
export declare class CosmeticLoyaltyReward {
    ids: string[];
}
export declare const LoyaltyReward: LoyaltyPointsLoyaltyReward | CosmeticLoyaltyReward;
export declare class SeasonRank {
    seasonNumber: number;
    rank: LoyaltyRank;
    threshold: string;
    rewards: (typeof LoyaltyReward)[];
    previousRank?: SeasonRank | null;
    nextRank?: SeasonRank | null;
    claim?: UserSeasonRankClaim | null;
}
