import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from './SeasonRank.entity';
import { DiscordTierEnum } from '../enums/DiscordTierEnum.enum';
export declare class UserSeasonChapterData extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    chapterId: number;
    snapshotAt: Date;
    points: string;
    rank: LoyaltyRank;
    questCompleted: string;
    discordTierFloor: DiscordTierEnum | null;
}
