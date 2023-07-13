import { BaseEntity } from 'typeorm';
import { SeasonRank } from '.';
export declare class User extends BaseEntity {
    address: string;
    loyaltyPoints: string;
    loyaltyRewards: string;
    loyaltyRewardsClaimed: string;
    rank?: SeasonRank | null;
}
