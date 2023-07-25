import { BaseEntity } from 'typeorm';
import { SeasonRank } from '.';
export declare class User extends BaseEntity {
    address: string;
    referralCode: string;
    referrerAddress: string | null;
    loyaltyPoints: string;
    loyaltyRewards: string;
    loyaltyRewardsClaimed: string;
    timestamp: Date;
    rank?: SeasonRank | null;
    referrer?: User | null;
}
