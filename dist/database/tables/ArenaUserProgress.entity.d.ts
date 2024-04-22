import { BaseEntity } from 'typeorm';
import { ArenaDivisionName } from '.';
export declare class ArenaUserProgress extends BaseEntity {
    userTwitter: string;
    seasonNumber: string;
    stars: string;
    xp: string;
    totalReferrals: string;
    questCompleted: string;
    division: ArenaDivisionName;
    league: string;
    rank: string;
    leagueRank: string;
    twentyFourHourRank: string;
}
