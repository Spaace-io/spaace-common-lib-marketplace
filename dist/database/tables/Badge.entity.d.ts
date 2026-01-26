import { BaseEntity } from 'typeorm';
import { BadgeConditionEntity } from './BadgeCondition.entity';
import { UserBadgeEntity } from './UserBadge.entity';
export declare enum BadgeCategory {
    COLLECTOR = "collector",
    TRADING = "trading",
    ACTIVITY = "activity",
    SOCIAL = "social",
    LOYALTY = "loyalty"
}
export declare enum BadgeRarity {
    COMMON = "common",
    RARE = "rare",
    EPIC = "epic",
    LEGENDARY = "legendary"
}
export declare class BadgeEntity extends BaseEntity {
    id: string;
    code: string;
    category: BadgeCategory;
    name: string;
    description: string | null;
    iconUrl: string | null;
    isActive: boolean;
    isRepeatable: boolean;
    maxCount: number | null;
    sortOrder: number;
    rarity: BadgeRarity;
    createdAt: Date;
    updatedAt: Date;
    conditions?: BadgeConditionEntity[];
    userBadges?: UserBadgeEntity[];
}
