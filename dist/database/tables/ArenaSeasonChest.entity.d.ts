import { BaseEntity } from 'typeorm';
import { ArenaDivisionName, ArenaChestName } from '.';
declare class ChestCount {
    name: ArenaChestName;
    count: number;
}
export declare class ArenaSeasonChest extends BaseEntity {
    seasonNumber: string;
    divisionName: ArenaDivisionName;
    rank: string;
    chestCount: ChestCount[];
}
export {};
