import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare enum ArenaQuestTrigger {
    USER = "USER",
    USER_QUEST_PROGRESS = "USER_QUEST_PROGRESS",
    REFERRAL = "REFERRAL",
    SOCIAL = "SOCIAL",
    SOCIAL_PRIME = "SOCIAL_PRIME"
}
export declare enum ArenaQuestRuleOperator {
    EQ = "EQ",
    GT = "GT",
    GTE = "GTE",
    LT = "LT",
    LTE = "LTE",
    NEQ = "NEQ",
    IN = "IN"
}
export declare class ArenaQuestRule {
    property: string;
    operator: ArenaQuestRuleOperator;
    value: string;
    delta: string | null;
}
export declare class ArenaQuestStep {
    trigger: ArenaQuestTrigger;
    rules: ArenaQuestRule[];
    cron?: boolean;
}
export declare enum ArenaQuestPeriod {
    DAILY = "DAILY",
    SEASONAL = "SEASONAL"
}
export declare class AreanaQuest extends BaseEntity {
    seasonNumber: string;
    id: string;
    name: string;
    previousQuestId: string | null;
    referenceQuestId: string | null;
    count: string;
    steps: ArenaQuestStep[];
    stars: string;
    limit: string;
    period: ArenaQuestPeriod;
    rank: LoyaltyRank;
    prime: boolean;
}
