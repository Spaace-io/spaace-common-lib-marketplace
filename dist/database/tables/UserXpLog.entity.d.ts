import { BaseEntity } from 'typeorm';
export declare enum UserXpLogSource {
    QUEST = "QUEST",
    REFERRAL = "REFERRAL"
}
export declare class UserXpLogMetadata {
    key: string;
    value: string;
}
export declare class UserXpLog extends BaseEntity {
    id: number;
    userAddress: string;
    seasonNumber: string;
    questId: string;
    source: UserXpLogSource;
    metadata: UserXpLogMetadata[];
    createdAt: Date;
    xp: string;
}
