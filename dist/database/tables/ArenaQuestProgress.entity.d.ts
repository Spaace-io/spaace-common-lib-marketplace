import { BaseEntity } from 'typeorm';
export declare class ArenaQuestProgress extends BaseEntity {
    userTwitterId: string;
    seasonNumber: string;
    questId: string;
    nonce: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
