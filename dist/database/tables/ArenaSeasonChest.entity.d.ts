import { BaseEntity } from 'typeorm';
import { ArenaDivisionName } from '.';
declare class ChestCount {
    name: string;
    count: number;
}
export declare class ArenaSeasonChest extends BaseEntity {
    seasonNumber: string;
    divisionName: ArenaDivisionName;
    rank: string;
    chestCount: ChestCount[];
}
export {};
