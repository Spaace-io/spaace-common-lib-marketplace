import { BaseEntity } from 'typeorm';
import { SeasonRank, User } from '.';
export declare class UserLoyalty extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    points: string;
    user?: User;
    rank?: SeasonRank | null;
    ranking?: string;
}
