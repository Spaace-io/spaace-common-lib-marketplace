import { BaseEntity } from 'typeorm';
export declare enum DistributorContract {
    TRADING_REWARDS = "Trading",
    REFERRAL_REWARDS = "Referral",
    LOYALTY_REWARDS = "Loyalty"
}
export declare class DistributorReward extends BaseEntity {
    userAddress: string;
    distributor: DistributorContract;
    amount: string;
    signature: string;
    timestamp: Date;
    harvestTxHash: string | null;
    harvestLogIdx: string | null;
    harvestTimestamp: Date | null;
}
