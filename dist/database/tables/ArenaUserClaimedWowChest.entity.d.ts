import { BaseEntity } from 'typeorm';
import { ArenaWowChestType } from '.';
export declare class ArenaUserClaimedWowChest extends BaseEntity {
    id: string;
    userTwitter: string;
    chestPeriod: string;
    type: ArenaWowChestType;
    value: string;
    timestamp: Date;
}
