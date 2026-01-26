import { BaseEntity } from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';
export declare class BadgeUnlockHistoryEntity extends BaseEntity {
    id: string;
    userAddress: string;
    badgeId: string;
    unlockedAt: Date;
    createdAt: Date;
    user?: User;
    badge?: BadgeEntity;
}
