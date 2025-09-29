import { BaseEntity } from 'typeorm';
import { ModerationAction } from '../enums/ModerationAction.enum';
export declare class ModerationAudit extends BaseEntity {
    id: string;
    action: ModerationAction;
    wallet: string | null;
    details: Record<string, unknown> | null;
    actedBy: string | null;
    createdAt: Date;
}
