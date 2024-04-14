import { BaseEntity } from 'typeorm';
export declare enum ArenaCrewChestTiers {
    TIER_1 = "1",
    TIER_2 = "2",
    TIER_3 = "3"
}
declare class Tier {
    tierNumber: ArenaCrewChestTiers;
    xp: number;
}
export declare class ArenaCrewChestPoint extends BaseEntity {
    id: string;
    minRank: string;
    maxRank: string;
    tiers: Tier[];
}
export {};
