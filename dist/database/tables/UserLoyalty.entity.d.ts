import { BaseEntity } from 'typeorm';
import { SeasonRank } from '.';
export declare class UserLoyalty extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    points: string;
    questCompleted: string;
    rank: SeasonRank;
    boostMultiplier: number;
}
