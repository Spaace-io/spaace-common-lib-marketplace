import { BaseEntity } from 'typeorm';
export declare enum ArenaChestName {
    MYTIC = "MYTIC",
    LEGENDARY = "LEGENDARY",
    RARE = "RARE",
    UNCOMMON = "UNCOMMON",
    COMMON = "COMMON",
    GENESIS = "GENESIS"
}
export declare class ArenaChestPoints extends BaseEntity {
    name: ArenaChestName;
    xp: string;
}
