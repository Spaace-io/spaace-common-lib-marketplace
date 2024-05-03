import { BaseEntity } from 'typeorm';
export declare class ArenaCrewQuestProgress extends BaseEntity {
    crewName: string;
    questId: string;
    seasonNumber: string;
    nonce: string;
    data: string[][];
    completed: boolean;
    timestamp: Date;
}
