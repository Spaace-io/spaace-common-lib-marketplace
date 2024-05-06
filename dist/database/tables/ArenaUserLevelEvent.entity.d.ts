import { BaseEntity } from 'typeorm';
export declare class ArenaUserLevelEvent extends BaseEntity {
    id: string;
    userTwitterId: string;
    oldLevel: string;
    newLevel: string;
    inProcess: boolean;
}
