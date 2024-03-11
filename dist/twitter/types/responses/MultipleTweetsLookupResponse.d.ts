export interface MultipleTweetsLookupResponse {
    public_metrics?: TweetMetrics;
    author_id: string;
    text: string;
    id: string;
}
interface TweetMetrics {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count?: number;
    bookmark_count?: number;
    impression_count: number;
}
export {};
