import { BaseEntity } from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';
export declare enum BadgeStatus {
    LOCKED = "LOCKED",
    UNLOCKED = "UNLOCKED",
    CLAIMED = "CLAIMED"
}
export declare class UserBadgeEntity extends BaseEntity {
    id: string;
    userAddress: string;
    badgeId: string;
    status: BadgeStatus;
    count: number;
    unlockedAt: Date | null;
    claimedAt: Date | null;
    lastEvaluatedAt: Date | null;
    nextEvaluationAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    user?: User;
    badge?: BadgeEntity;
}
