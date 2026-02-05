import { BaseEntity } from 'typeorm';
import { Season } from './Season.entity';
import { LoyaltyRank } from './SeasonRank.entity';
import { User } from './User.entity';
import { RankChestState } from '../enums/RankChestState.enum';
import { RankChestReward } from './RankChestReward.entity';
export declare class RankChest extends BaseEntity {
    id: string;
    userAddress: string;
    user: User;
    seasonNumber: string;
    season: Season;
    rank: LoyaltyRank;
    state: RankChestState;
    createdAt: Date;
    claimedAt: Date | null;
    createdFrom: string | null;
    reward: RankChestReward | null;
}
