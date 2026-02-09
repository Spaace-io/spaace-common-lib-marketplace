import { BaseEntity } from 'typeorm';
export declare enum UserXpLogSource {
    QUEST = "QUEST",
    REFERRAL = "REFERRAL",
    ADMIN = "ADMIN",
    TOURNAMENT = "TOURNAMENT",
    RANK_CHEST = "RANK_CHEST"
}
export declare class UserXpLogMetadata {
    key: string;
    value: string;
}
export declare class UserXpLog extends BaseEntity {
    id: number;
    userAddress: string;
    seasonNumber: string;
    questId?: string | null;
    tournamentId?: string | null;
    source: UserXpLogSource;
    metadata: UserXpLogMetadata[];
    createdAt: Date;
    xp: string;
}
