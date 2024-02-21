import { BaseEntity } from 'typeorm';
export declare class ArenaUserStatistics extends BaseEntity {
    twitterUsername: string;
    totalLikes: number;
    totalReposts: number;
}
