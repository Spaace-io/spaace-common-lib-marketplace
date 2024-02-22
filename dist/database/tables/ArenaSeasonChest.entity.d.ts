import { BaseEntity } from 'typeorm';
declare class ChestCount {
    name: string;
    count: number;
}
export declare class ArenaSeasonChest extends BaseEntity {
    seasonNumber: string;
    division: string;
    rank: string;
    chestCount: ChestCount[];
}
export {};
