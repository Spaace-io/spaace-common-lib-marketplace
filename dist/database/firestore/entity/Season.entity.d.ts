export declare enum QuestTrigger {
    SALE = "Sale",
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
export declare class LoyaltyPointsQuestReward {
    amount: string;
}
export declare class StakingBonusQuestReward {
    amount: string;
}
export declare class SpaaceTokensQuestReward {
    amount: string;
}
export declare class CosmeticQuestReward {
    id: string;
}
export declare const QuestReward: LoyaltyPointsQuestReward | CosmeticQuestReward;
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
export declare class Quest {
    steps: QuestStep[];
    rewards: (typeof QuestReward)[];
    limit: number | null;
    period: QuestPeriod | null;
}
export declare class Rank {
    id: number;
    name: string;
    loyaltyPointsThreshold: string;
    rewards: (typeof QuestReward)[];
}
export declare class Season {
    id: number;
    startDate: Date;
    endDate: Date | null;
    quests: Quest[];
    ranks: Rank[];
}
