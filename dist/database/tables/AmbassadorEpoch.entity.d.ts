import { BaseEntity } from 'typeorm';
export declare enum AmbassadorEpochStatus {
    DRAFT = "DRAFT",
    SCHEDULED = "SCHEDULED",
    LIVE = "LIVE",
    ENDED = "ENDED"
}
export declare class AmbassadorEpoch extends BaseEntity {
    id: string;
    title: string;
    startAt: Date;
    endAt: Date;
    rewardPoolUsd: string;
    winnersCount: number;
    status: AmbassadorEpochStatus;
    lastLeaderboardComputedAt: Date | null;
    finalizedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
