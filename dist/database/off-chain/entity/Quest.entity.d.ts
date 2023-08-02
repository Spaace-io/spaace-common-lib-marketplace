import { BaseEntity } from 'typeorm';
import { UserQuestProgress } from '.';
export declare enum QuestTrigger {
    SALE = "Sale",
    TRANSFER = "Transfer",
    ORDER = "Order",
    UNISWAP = "Uniswap",
    STAKING_DEPOSIT = "StakingDeposit",
    STAKING_REWARD = "StakingReward",
    DISTRIBUTOR_REWARD = "DistributorReward",
    USER_QUEST_PROGRESS = "UserQuestProgress",
    REFERRAL = "Referral",
    CART_ITEM = "CartItem",
    TWITTER_POST = "TwitterPost",
    TWITTER_LIKE = "TwitterLike",
    TWITTER_RT = "TwitterRT",
    CRON = "Cron",
    USER_INTERACTION = "UserInteraction"
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
    count?: string;
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
