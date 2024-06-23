import { BaseEntity } from 'typeorm';
export declare class ArenaUserStatistics extends BaseEntity {
    userTwitterId: string;
    seasonNumber: string;
    totalLikes: string;
    totalReposts: string;
    totalReplies: string;
    totalQuotes: string;
}
