import { BaseEntity } from 'typeorm';
export declare class ArenaUserProgress extends BaseEntity {
    userTwitter: string;
    seasonNumber: string;
    stars: string;
    xp: string;
    questCompleted: string;
    division: string;
    league: string;
    rank: string;
    leagueRank: string;
}
