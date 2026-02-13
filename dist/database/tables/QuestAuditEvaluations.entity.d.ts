import { BaseEntity } from 'typeorm';
import { QuestPeriod, QuestRuleOperator, QuestTrigger } from './Quest.entity';
import { QuestAuditEvent } from './QuestAuditEvent.entity';
import { QuestType } from '../enums';
export declare enum QuestAuditStatus {
    PASSED = "PASSED",
    FAILED = "FAILED",
    INDETERMINATE = "INDETERMINATE",
    SKIPPED = "SKIPPED"
}
export declare class QuestAuditRuleResult {
    property: string;
    operator: QuestRuleOperator;
    expected: string;
    actual: string | null;
    passed: boolean;
    reason: string | null;
}
export declare class QuestAuditEvaluation extends BaseEntity {
    id: string;
    eventId: string;
    event: QuestAuditEvent;
    seasonNumber: string;
    userAddress: string;
    trigger: QuestTrigger;
    questId: string;
    questName: string;
    questType: QuestType;
    period: QuestPeriod;
    status: QuestAuditStatus;
    awardedPoints: string;
    multiplier: number;
    userQuestProgressNonce: string | null;
    questRevision: string | null;
    ruleResults: QuestAuditRuleResult[];
    createdAt: Date;
}
