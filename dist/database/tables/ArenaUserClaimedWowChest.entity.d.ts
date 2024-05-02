import { BaseEntity } from 'typeorm';
import { ArenaWowChestType } from '.';
export declare class ArenaUserClaimedWowChest extends BaseEntity {
    id: string;
    userTwitterId: string;
    chestPeriod: string;
    type: ArenaWowChestType;
    value: string;
    timestamp: Date;
}
