import { BaseEntity } from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';
export declare class UserFeaturedBadgeEntity extends BaseEntity {
    id: string;
    userAddress: string;
    position: number;
    badgeId: string;
    updatedAt: Date;
    user?: User;
    badge?: BadgeEntity;
}
