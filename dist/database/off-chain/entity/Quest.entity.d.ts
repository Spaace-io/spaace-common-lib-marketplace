import { BaseEntity } from 'typeorm';
import { UserQuestProgress } from '.';
export declare enum QuestTrigger {
    SALE = "Sale",
    TRANSFER = "Transfer",
    ORDER = "Order",
    UNISWAP = "Uniswap",
    STAKING_REWARD = "StakingReward",
    TRADING_REWARD = "TradingReward",
    QUEST = "Quest",
    REFERRAL = "Referral",
    CART_ITEM = "CartItem",
    TWITTER_POST = "TwitterPost",
    TWITTER_LIKE = "TwitterLike",
    TWITTER_RT = "TwitterRT",
    CRON = "Cron"
}
export declare enum QuestRuleOperator {
    EQ = "=",
    GT = ">",
    GTE = ">=",
    LT = "<",
    LTE = "<=",
    NEQ = "!="
}
export declare class QuestRule {
    property: string;
    operator: QuestRuleOperator;
    value: string;
    delta: string | null;
}
export declare class QuestStep {
    trigger: QuestTrigger;
    rules: QuestRule[];
}
export declare enum QuestPeriod {
    DAILY = "day",
    SEASONAL = "season"
}
export declare class Quest extends BaseEntity {
    seasonNumber: number;
    id: string;
    name: string;
    description: string;
    previousQuestId: string | null;
    prime: boolean;
    steps: QuestStep[];
    loyaltyPoints: string;
    limit: number;
    period: QuestPeriod;
    previousQuest?: Quest | null;
    nextQuest?: Quest | null;
    progress?: UserQuestProgress[] | null;
}
