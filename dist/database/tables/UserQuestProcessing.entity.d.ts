import { BaseEntity } from 'typeorm';
export declare class UserQuestProcessing extends BaseEntity {
    userAddress: string;
    questId: string;
    seasonNumber: string;
    scopeKey: string;
    createdAt: Date;
    completedAt: Date | null;
}
