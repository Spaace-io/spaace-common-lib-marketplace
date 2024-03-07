import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from '.';
export declare enum ArenaQuestTrigger {
    USER = "USER",
    USER_QUEST_PROGRESS = "USER_QUEST_PROGRESS",
    REFERRAL = "REFERRAL",
    SOCIAL = "SOCIAL",
    SOCIAL_PRIME = "SOCIAL_PRIME",
    USER_LEVEL_PROGRESS = "USER_LEVEL_PROGRESS"
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
export declare enum ArenaQuestOperator {
    SUM = "SUM",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV"
}
export declare enum ArenaQuestType {
    PRIME = "PRIME",
    SPECIAL = "SPECIAL",
    ONE_SHOT = "ONE_SHOT",
    PROGRESSIVE_STREAK = "PROGRESSIVE_STREAK"
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
export declare class ArenaQuestOperation {
    property: string;
    operation: ArenaQuestOperator;
    target: string;
    updates: string;
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
    operations: ArenaQuestOperation[];
    stars: string;
    limit: string;
    period: ArenaQuestPeriod;
    rank: LoyaltyRank;
    type: ArenaQuestType;
    cronName: string;
    cronParameter: string;
}
