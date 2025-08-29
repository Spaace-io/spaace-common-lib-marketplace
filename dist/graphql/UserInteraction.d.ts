import { TweetAction } from '../database/enums';
export declare enum UserInteractionType {
    DAILY_CLAIM = "DAILY_CLAIM",
    BUY_NOW = "BUY_NOW",
    SELL_INSTANTLY = "SELL_INSTANTLY",
    SWEEP_FLOOR = "SWEEP_FLOOR",
    TWEET_ACTION = "TWEET_ACTION",
    SHARE_CARD = "SHARE_CARD",
    LINK_TWITTER = "LINK_TWITTER",
    FOLLOW_TWITTER_SPAACE = "FOLLOW_TWITTER_SPAACE",
    LINK_DISCORD = "LINK_DISCORD",
    FOLLOW_DISCORD_SPAACE = "FOLLOW_DISCORD_SPAACE"
}
export declare class UserInteraction {
    type: UserInteractionType;
    userAddress: string;
    tweetAction: TweetAction | null;
    tweetId: string | null;
    twitterHandle: string | null;
    followTwitterTarget: string | null;
    discordHandle: string | null;
    followDiscordTarget: string | null;
}
