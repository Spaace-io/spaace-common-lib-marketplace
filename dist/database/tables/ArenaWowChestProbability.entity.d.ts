import { BaseEntity } from 'typeorm';
export declare enum ArenaWowChestType {
    XP = "XP",
    BOOSTER = "BOOSTER",
    EMPTY = "EMPTY",
    BITCOIN = "BITCOIN"
}
export declare class ArenaWowChestProbability extends BaseEntity {
    id: string;
    type: ArenaWowChestType;
    value: string;
    probability: string;
}
