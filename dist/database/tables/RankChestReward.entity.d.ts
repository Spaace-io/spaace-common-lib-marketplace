import { BaseEntity } from 'typeorm';
import { RankChest } from './RankChest.entity';
import { RankChestXpOutcome } from '../enums';
export declare class RankChestReward extends BaseEntity {
    id: string;
    rankChestId: string;
    chest: RankChest;
    xpOutcome: RankChestXpOutcome;
    baseXp: string;
    xpValues: string[];
    xpAmount: string;
    multiplierValue: number;
    multiplierDurationHours: number;
    startAt: Date;
    endAt: Date;
    xpMultiplierId: number | null;
    createdAt: Date;
}
