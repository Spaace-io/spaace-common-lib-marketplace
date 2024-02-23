import { BaseEntity } from 'typeorm';
import { ArenaSeason } from '.';
export declare class ArenaDivision extends BaseEntity {
    divisionName: string;
    seasonNumber: number;
    season: ArenaSeason;
    leagueUsersMaxCap: number;
}
