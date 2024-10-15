import { BaseEntity } from 'typeorm';
import { ArenaChestName } from '.';
import { ArenaDivisionName } from '../enums';
declare class ChestCount {
    name: ArenaChestName;
    count: number;
}
export declare class ArenaSeasonChest extends BaseEntity {
    divisionName: ArenaDivisionName;
    rank: string;
    chestCount: ChestCount[];
}
export {};
