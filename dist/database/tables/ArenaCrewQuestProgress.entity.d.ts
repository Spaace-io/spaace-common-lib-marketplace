import { BaseEntity } from 'typeorm';
export declare class ArenaCrewQuestProgress extends BaseEntity {
    crewName: string;
    seasonNumber: string;
    questId: string;
    nonce: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
