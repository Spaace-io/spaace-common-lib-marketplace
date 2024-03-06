import { BaseEntity } from 'typeorm';
export declare class ArenaTweet extends BaseEntity {
    id: string;
    authorId: string;
    text: string;
    likeCount: number;
    replyCount: number;
    retweetCount: number;
    viewCount: number;
}
