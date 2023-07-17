import { BaseEntity } from 'typeorm';
export declare class UserQuestProgress extends BaseEntity {
    userAddress: string;
    seasonNumber: number;
    questId: string;
    nonce: string;
    completed: boolean;
    timestamp: Date;
}
