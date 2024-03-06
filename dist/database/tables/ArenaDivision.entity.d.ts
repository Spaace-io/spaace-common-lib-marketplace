import { BaseEntity } from 'typeorm';
export declare enum ArenaDivisionName {
    DIAMOND = "DIAMOND",
    PLATINUM = "PLATINUM",
    GOLD = "GOLD",
    SILVER = "SILVER",
    BRONZE = "BRONZE"
}
export declare class ArenaDivision extends BaseEntity {
    seasonNumber: string;
    name: ArenaDivisionName;
    leagueUserMaxCap: string;
}
