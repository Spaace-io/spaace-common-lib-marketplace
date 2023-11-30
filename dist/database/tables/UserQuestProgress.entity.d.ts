import { BaseEntity } from 'typeorm';
export declare class UserQuestProgress extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    questId: string;
    nonce: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
