import { LoyaltyRank } from '.';
export declare class LoyaltyPointsLoyaltyRewardClaim {
    amount: string;
}
export declare class StakingBonusLoyaltyRewardClaim {
    amount: string;
}
export declare class SpaaceTokensLoyaltyRewardClaim {
    amount: string;
}
export declare class CosmeticLoyaltyRewardClaim {
    id: string;
}
export declare const LoyaltyRewardClaim: LoyaltyPointsLoyaltyRewardClaim | CosmeticLoyaltyRewardClaim;
export declare class UserSeasonRankClaim {
    userAddress: string;
    seasonNumber: number;
    rank: LoyaltyRank;
    rewards: (typeof LoyaltyRewardClaim)[];
    timestamp: Date;
}
