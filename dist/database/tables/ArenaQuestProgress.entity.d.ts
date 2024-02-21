import { BaseEntity } from 'typeorm';
export declare class ArenaQuestProgress extends BaseEntity {
    twitterName: string;
    seasonNumber: string;
    questId: string;
    nonce: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
