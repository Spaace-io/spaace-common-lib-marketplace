import { MultipleTweetsLookupResponse } from './types/responses/MultipleTweetsLookupResponse';
import { TweetsStatsResponse, UserStatsResponse } from './types/responses/TweetsStatsResponse';
import { ArenaUser } from '../database';
import { TwitterUserv2 } from './types';
export declare enum TwitterApiVersions {
    V1 = "1.1",
    V2 = "2"
}
export declare class TwitterApiHandler {
    private twitterApiInstance;
    private readonly twitterApiBaseUrl;
    constructor(userCreds?: Pick<ArenaUser, 'twitterAccessToken' | 'twitterSecretToken'>, twitterApiVersion?: TwitterApiVersions);
    static build(twitterId?: string, twitterApiVersion?: TwitterApiVersions): Promise<TwitterApiHandler>;
    static buildWithCreds(twitterAccessToken: string, twitterSecretToken: string, twitterApiVersion?: TwitterApiVersions): Promise<TwitterApiHandler>;
    getUserById(id: string): Promise<TwitterUserv2>;
    getUserByUsername(username: string): Promise<TwitterUserv2>;
    getMultipleTweets(tweetIds: string[]): Promise<MultipleTweetsLookupResponse[]>;
    getLikingUsers(tweetId: string, pagination_token?: string): Promise<UserStatsResponse>;
    getRetweetedByUsers(tweetId: string, pagination_token?: string): Promise<UserStatsResponse>;
    getReplies(tweetId: string, startTime?: string, endTime?: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getQuoteTweets(tweetId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getLikedTweets(userId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getMentions(query: string, startTime?: string, endTime?: string): Promise<MultipleTweetsLookupResponse[]>;
}
