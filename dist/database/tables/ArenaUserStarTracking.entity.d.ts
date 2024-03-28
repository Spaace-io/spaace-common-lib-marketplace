import { BaseEntity } from 'typeorm';
export declare class ArenaUserStarTracking extends BaseEntity {
    id: string;
    userTwitter: string;
    stars: string;
    timestamp: Date;
}
