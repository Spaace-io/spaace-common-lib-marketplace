import { TweetAction } from '../database/enums';
export declare enum UserInteractionType {
    DAILY_CLAIM = "DAILY_CLAIM",
    BUY_NOW = "BUY_NOW",
    SELL_INSTANTLY = "SELL_INSTANTLY",
    SWEEP_FLOOR = "SWEEP_FLOOR",
    TWEET_ACTION = "TWEET_ACTION",
    SHARE_CARD = "SHARE_CARD"
}
export declare class UserInteraction {
    type: UserInteractionType;
    userAddress: string;
    tweetAction: TweetAction | null;
    tweetId: string | null;
}
