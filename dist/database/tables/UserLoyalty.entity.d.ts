import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare class UserLoyalty extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    points: string;
    questCompleted: string;
    rank: LoyaltyRank;
}
