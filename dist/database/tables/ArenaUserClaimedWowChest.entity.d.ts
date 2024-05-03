import { BaseEntity } from 'typeorm';
import { ArenaWowChestType } from '.';
export declare class ArenaUserClaimedWowChest extends BaseEntity {
    id: string;
    chestPeriod: string;
    userTwitterId: string;
    type: ArenaWowChestType;
    value: string;
    timestamp: Date;
}
