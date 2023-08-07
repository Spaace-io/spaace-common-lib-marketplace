import { BaseEntity } from 'typeorm';
import { UserQuestProgress } from '.';
export declare enum QuestTrigger {
    TOKEN_TRANSFER = "TokenTransfer",
    UNISWAP = "Uniswap",
    TRANSFER = "Transfer",
    SALE = "Sale",
    ORDER = "Order",
    STAKING_DEPOSIT = "StakingDeposit",
    STAKING_REWARD = "StakingReward",
    DISTRIBUTOR_REWARD = "DistributorReward",
    USER_QUEST_PROGRESS = "UserQuestProgress",
    REFERRAL = "Referral",
    CART_ITEM = "CartItem",
    USER_INTERACTION = "UserInteraction",
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
    count?: string;
}
export declare enum QuestPeriod {
    DAILY = "day",
    SEASONAL = "season"
}
export declare class Quest extends BaseEntity {
    seasonNumber: string;
    id: string;
    name: string;
    previousQuestId: string | null;
    prime: boolean;
    steps: QuestStep[];
    loyaltyPoints: string;
    boost: string;
    boostLimit: string | null;
    limit: string;
    period: QuestPeriod;
    previousQuest?: Quest | null;
    nextQuest?: Quest | null;
    progress?: UserQuestProgress[] | null;
}
