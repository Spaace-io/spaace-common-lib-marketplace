import { BaseEntity } from 'typeorm';
export declare enum ArenaTiers {
    TIER_1 = "1",
    TIER_2 = "2",
    TIER_3 = "3",
    TIER_4 = "4",
    TIER_5 = "5"
}
declare class Tier {
    tierNumber: ArenaTiers;
    probability: number;
    coefficient: number;
}
export declare class ArenaSeasonChestGenesis extends BaseEntity {
    id: string;
    minChestCount: string;
    maxChestCount: string;
    tiers: Tier[];
}
export {};
