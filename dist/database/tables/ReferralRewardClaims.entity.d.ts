import { BaseEntity } from 'typeorm';
export declare enum ClaimStatus {
    PENDING = "pending",// Pending claim
    COMPLETED = "completed",// Successfully claimed
    FAILED = "failed"
}
export declare class ReferralRewardClaims extends BaseEntity {
    id: string;
    referrerAddress: string;
    amount: string;
    status: ClaimStatus;
    txHash: string | null;
    createdAt: Date;
    completedAt: Date | null;
}
