import { BaseEntity } from 'typeorm';
export declare enum ArenaWowChestType {
    XP = "XP",
    TOKEN = "TOKEN",
    BOOSTER = "BOOSTER"
}
export declare class ArenaWowChestProbability extends BaseEntity {
    id: string;
    type: ArenaWowChestType;
    value: string;
    probability: string;
}
