import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare class LoyaltyPointsLoyaltyRewardClaim {
    constructor(amount: string);
    amount: string;
}
export declare class StakingBonusLoyaltyRewardClaim {
    constructor(amount: string);
    amount: string;
}
export declare class SpaaceTokensLoyaltyRewardClaim {
    constructor(amount: string);
    amount: string;
}
export declare class CosmeticLoyaltyRewardClaim {
    constructor(id: string);
    id: string;
}
export declare const LoyaltyRewardClaim: LoyaltyPointsLoyaltyRewardClaim | CosmeticLoyaltyRewardClaim;
export declare class UserSeasonRankClaim extends BaseEntity {
    userAddress: string;
    seasonNumber: number;
    rank: LoyaltyRank;
    rewards: (typeof LoyaltyRewardClaim)[];
    timestamp: Date;
}
