import { BaseEntity } from 'typeorm';
import { QuestTrigger } from './Quest.entity';
import { Marketplace } from '../enums';
import { QuestAuditEvaluation } from './QuestAuditEvaluations.entity';
export declare class QuestAuditEventPayload {
    priceWei?: string | null;
    usdPrice?: string | null;
    currency?: string | null;
}
export declare class QuestAuditEvent extends BaseEntity {
    id: string;
    seasonNumber: string;
    userAddress: string;
    trigger: QuestTrigger;
    occurredAt: Date;
    processedAt: Date;
    txHash: string | null;
    logIdx: string | null;
    orderHash: string | null;
    collectionAddress: string;
    tokenId: string;
    marketplace: Marketplace | null;
    payload: QuestAuditEventPayload;
    durationMs: number | null;
    createdAt: Date;
    evaluations?: QuestAuditEvaluation[];
}
