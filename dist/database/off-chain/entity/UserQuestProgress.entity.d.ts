import { BaseEntity } from 'typeorm';
export declare class UserQuestProgress extends BaseEntity {
    userAddress: string;
    seasonNumber: number;
    questId: string;
    progressCurrentStep: number;
    countForCurrentStep: number;
    nonce: string;
    completed: boolean;
    timestamp: Date;
}
