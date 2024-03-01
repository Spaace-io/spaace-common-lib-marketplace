import { BaseEntity } from 'typeorm';
export declare class ArenaTwitterMetrics extends BaseEntity {
    tweetId: string;
    likePaginationToken: string;
    replyPaginationToken: string;
    quotePaginationToken: string;
    retweetPaginationToken: string;
}
