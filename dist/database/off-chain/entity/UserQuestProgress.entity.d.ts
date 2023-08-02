import { BaseEntity } from 'typeorm';
export declare class UserQuestProgress extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    questId: string;
    nonce: string;
    currentStep: string;
    completed: boolean;
    timestamp: Date;
}
