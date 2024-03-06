import { BaseEntity } from 'typeorm';
import { ArenaDivisionName } from '.';
export declare class ArenaLeague extends BaseEntity {
    seasonNumber: string;
    divisionName: ArenaDivisionName;
    leagueNumber: string;
    numberOfUsers: string;
}
