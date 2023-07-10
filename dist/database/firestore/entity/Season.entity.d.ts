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
export declare enum QuestRewardType {
    LOYALTY_POINTS = "LoyaltyPoints",
    STAKING_BONUS = "StakingBonus",
    SPAACE_TOKENS = "SpaaceTokens",
    COSMETIC = "Cosmetic"
}
export declare class LoyaltyPointsQuestReward {
    readonly type = QuestRewardType.LOYALTY_POINTS;
    amount: string;
}
export declare class StakingBonusQuestReward {
    readonly type = QuestRewardType.STAKING_BONUS;
    amount: string;
}
export declare class SpaaceTokensQuestReward {
    readonly type = QuestRewardType.SPAACE_TOKENS;
    amount: string;
}
export declare class CosmeticQuestReward {
    readonly type = QuestRewardType.COSMETIC;
    id: string;
}
export type QuestReward = LoyaltyPointsQuestReward | StakingBonusQuestReward | SpaaceTokensQuestReward | CosmeticQuestReward;
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
    delta?: string;
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
    rewards: QuestReward[];
    limit?: number;
    period?: QuestPeriod;
}
export declare class Rank {
    id: number;
    name: string;
    loyaltyPointsThreshold: string;
    rewards: QuestReward[];
}
export declare class Season {
    id: number;
    startDate: Date;
    endDate?: Date;
    quests: Quest[];
    ranks: Rank[];
}
