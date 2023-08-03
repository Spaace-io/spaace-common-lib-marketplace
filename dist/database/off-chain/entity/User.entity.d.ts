import { BaseEntity } from 'typeorm';
import { SeasonRank } from '.';
export declare class User extends BaseEntity {
    address: string;
    name: string | null;
    biography: string | null;
    imageUrl: string | null;
    bannerUrl: string | null;
    admin: boolean;
    referralCode: string;
    referrerAddress: string | null;
    loyaltyPoints: string;
    loyaltyRewards: string;
    loyaltyRewardsClaimed: string;
    timestamp: Date;
    rank?: SeasonRank | null;
    referrer?: User | null;
}
