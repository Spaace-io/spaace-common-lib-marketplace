import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
import { QuestType } from '../enums/QuestType.enum';
import { TweetAction } from '../enums';
export declare enum QuestTrigger {
    TOKEN_TRANSFER = "TOKEN_TRANSFER",
    UNISWAP = "UNISWAP",
    TRANSFER = "TRANSFER",
    SALE = "SALE",
    ORDER = "ORDER",
    USER = "USER",
    STAKING_DEPOSIT = "STAKING_DEPOSIT",
    DISTRIBUTOR_REWARD = "DISTRIBUTOR_REWARD",
    USER_QUEST_PROGRESS = "USER_QUEST_PROGRESS",
    REFERRAL = "REFERRAL",
    CART_ITEM = "CART_ITEM",
    USER_INTERACTION = "USER_INTERACTION",
    DATA_COMPILED = "DATA_COMPILED",
    QUEST_COMPLETED = "QUEST_COMPLETED",
    REFERRER = "REFERRER"
}
export declare enum QuestRuleOperator {
    EQ = "EQ",
    GT = "GT",
    GTE = "GTE",
    LT = "LT",
    LTE = "LTE",
    NEQ = "NEQ"
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
    cron?: boolean;
}
export declare enum QuestPeriod {
    DAILY = "DAILY",
    SEASONAL = "SEASONAL",
    FOREVER = "FOREVER"
}
export declare class Quest extends BaseEntity {
    seasonNumber: string;
    id: string;
    name: string;
    previousQuestId: string | null;
    count: string;
    prime: boolean;
    steps: QuestStep[];
    loyaltyPoints: string;
    boost: string;
    boostLimit: string | null;
    limit: string;
    period: QuestPeriod;
    rank: LoyaltyRank;
    questType: QuestType;
    featured: boolean;
    tweetId: string | null;
    tweetAction: TweetAction | null;
    order: string;
}
