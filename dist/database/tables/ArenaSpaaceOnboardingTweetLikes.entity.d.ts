import { BaseEntity } from 'typeorm';
export declare class ArenaSpaaceOnboardingTweetLikes extends BaseEntity {
    id: string;
    userTwitter: string;
    tweetId: string;
    actionType: string;
}
