import { BaseEntity } from 'typeorm';
import { BadgeEntity } from './Badge.entity';
export declare enum BadgeConditionType {
    BUY_COUNT_ON_SPAACE = "BUY_COUNT_ON_SPAACE",
    BUY_DISTINCT_COLLECTIONS_ON_SPAACE = "BUY_DISTINCT_COLLECTIONS_ON_SPAACE",
    BUY_SAME_COLLECTION_COUNT = "BUY_SAME_COLLECTION_COUNT",
    BLUECHIP_BUY_COUNT_ON_SPAACE = "BLUECHIP_BUY_COUNT_ON_SPAACE",
    SELL_COUNT_ON_SPAACE = "SELL_COUNT_ON_SPAACE",
    SELL_LOSS_ON_SPAACE = "SELL_LOSS_ON_SPAACE",
    LIST_COUNT_ON_SPAACE = "LIST_COUNT_ON_SPAACE",
    TRADING_VOLUME_ETH = "TRADING_VOLUME_ETH",
    QUEST_COMPLETED = "QUEST_COMPLETED",
    QUEST_COMPLETED_COUNT = "QUEST_COMPLETED_COUNT",
    DAILY_QUEST_STREAK = "DAILY_QUEST_STREAK",
    ACTIVE_REFERRALS_COUNT = "ACTIVE_REFERRALS_COUNT",
    CONNECTED_BEFORE_DATE = "CONNECTED_BEFORE_DATE",
    ACTIVE_DURING_PERIOD = "ACTIVE_DURING_PERIOD"
}
export declare class BadgeConditionEntity extends BaseEntity {
    id: string;
    badgeId: string;
    conditionType: BadgeConditionType;
    paramsJson: Record<string, unknown>;
    logicalOperator: 'AND' | 'OR';
    conditionGroup: number;
    createdAt: Date;
    updatedAt: Date;
    badge?: BadgeEntity;
}
