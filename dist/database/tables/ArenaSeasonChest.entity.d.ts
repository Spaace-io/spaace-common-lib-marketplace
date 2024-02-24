import { BaseEntity } from 'typeorm';
declare class ChestCount {
    name: string;
    count: number;
}
export declare class ArenaSeasonChest extends BaseEntity {
    seasonNumber: string;
    divisionName: string;
    rank: string;
    chestCount: ChestCount[];
}
export {};
