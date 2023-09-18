import { BaseEntity } from 'typeorm';
export declare enum DistributorContract {
    TRADING_REWARDS = "TRADING_REWARDS",
    REFERRAL_REWARDS = "REFERRAL_REWARDS",
    LOYALTY_REWARDS = "LOYALTY_REWARDS"
}
export declare class DistributorRewardEntity extends BaseEntity {
    userAddress: string;
    distributor: DistributorContract;
    amount: string;
    signature: string;
    timestamp: Date;
    harvestTxHash: string | null;
    harvestLogIdx: string | null;
    harvestTimestamp: Date | null;
}
