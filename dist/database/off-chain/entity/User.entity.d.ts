import { BaseEntity } from 'typeorm';
import { SeasonRank } from '.';
export declare class User extends BaseEntity {
    address: string;
    referralCode: string;
    loyaltyPoints: string;
    loyaltyRewards: string;
    loyaltyRewardsClaimed: string;
    timestamp: Date;
    rank?: SeasonRank | null;
}
