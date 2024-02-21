import { BaseEntity } from 'typeorm';
import { ArenaDivision, ArenaSeason } from '.';
export declare class ArenaLeague extends BaseEntity {
    leagueNumber: number;
    numberOfUsers: number;
    divisionNumber: string;
    division: ArenaDivision;
    seasonNumber: string;
    season: ArenaSeason;
}
