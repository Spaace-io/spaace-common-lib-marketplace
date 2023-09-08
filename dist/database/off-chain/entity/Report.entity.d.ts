import { BaseEntity } from 'typeorm';
export declare enum ReportReason {
    FAKE = "FAKE",
    EXPLICIT = "EXPLICIT",
    SPAM = "SPAM",
    OTHER = "OTHER"
}
export declare class Report extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
    reason: ReportReason;
}
