import { BaseEntity } from 'typeorm';
export declare class ArenaUserStarTracking extends BaseEntity {
    id: string;
    userTwitterId: string;
    stars: string;
    timestamp: Date;
}
