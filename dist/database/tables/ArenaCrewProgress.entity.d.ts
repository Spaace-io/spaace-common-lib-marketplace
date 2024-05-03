import { BaseEntity } from 'typeorm';
export declare class ArenaCrewProgress extends BaseEntity {
    seasonNumber: string;
    crewName: string;
    stars: string;
    memberStars: string;
    questCompleted: string;
    rank: string;
    twentyFourHourRank: string;
}
