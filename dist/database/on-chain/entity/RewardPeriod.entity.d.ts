import { BaseEntity } from 'typeorm';
export declare enum RewardPeriodType {
    TRADING_REWARDS = "Trading",
    REFERRAL_REWARDS = "Referral"
}
export declare class RewardPeriod extends BaseEntity {
    distributor: RewardPeriodType;
    startTime: Date;
    endTime: Date | null;
    amount: string;
    distributed: boolean;
}
