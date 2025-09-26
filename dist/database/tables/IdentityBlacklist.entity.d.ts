import { BaseEntity } from 'typeorm';
import { IdentifierType } from '../enums/IdentifierType.enum';
export declare class IdentityBlacklist extends BaseEntity {
    id: string;
    identifierType: IdentifierType;
    identifierValue: string;
    reason: string | null;
    createdBy: string | null;
    createdAt: Date;
}
