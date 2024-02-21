import { BaseEntity } from 'typeorm';
export declare class ArenaUserProgress extends BaseEntity {
    userTwitter: string;
    seasonNumber: string;
    points: string;
    questCompleted: string;
}
