import { BaseEntity } from 'typeorm';
import { NansenChestType, NansenChestStatus } from '../enums/NansenAirdrop.enum';
import { LoyaltyRank } from './SeasonRank.entity';
export declare class NansenMysteryChest extends BaseEntity {
    id: number;
    participantId: number;
    chestType: NansenChestType;
    unlockRequirement: LoyaltyRank | null;
    status: NansenChestStatus;
    unlockedAt: Date | null;
    claimedAt: Date | null;
}
