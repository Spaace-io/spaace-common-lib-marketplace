import { MultipleTweetsLookupResponse } from './types/responses/MultipleTweetsLookupResponse';
import { TweetsStatsResponse } from './types/responses/TweetsStatsResponse';
import { ArenaUser } from '../database';
export declare enum TwitterApiVersions {
    V1 = "1.1",
    V2 = "2"
}
export declare class TwitterApiHandler {
    private twitterApiInstance;
    private readonly twitterApiBaseUrl;
    constructor(userCreds?: Pick<ArenaUser, 'twitterAccessToken' | 'twitterSecretToken'>, twitterApiVersion?: TwitterApiVersions);
    static build(twitterId?: string, twitterApiVersion?: TwitterApiVersions): Promise<TwitterApiHandler>;
    getUserByUsername(username: string): Promise<any>;
    getMultipleTweets(tweetIds: string[]): Promise<MultipleTweetsLookupResponse[]>;
    getLikingUsers(tweetId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getRetweetedByUsers(tweetId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
    getReplies(tweetId: string, pagination_token?: string): Promise<TweetsStatsResponse>;
}
