import { BaseEntity } from 'typeorm';
import { PartnerChestUnlockLevel } from '../enums/PartnerChestUnlockLevel.enum';
import { PartnerChestUserRun } from './PartnerChestUserRun.entity';
export declare class PartnerChestClaim extends BaseEntity {
    id: string;
    userRunId: string;
    userRun: PartnerChestUserRun;
    unlockLevel: PartnerChestUnlockLevel;
    claimedAt: Date;
}
