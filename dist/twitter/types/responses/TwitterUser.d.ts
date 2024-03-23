export interface TwitterUserv2 {
    id: string;
    verified: boolean;
    description: string;
    created_at: string;
    name: string;
    username: string;
    public_metrics: Metrics;
}
export interface TwitterUserv1 {
    id_str: string;
    name: string;
    screen_name: string;
    description: string;
    followers_count: number;
    friends_count: number;
    created_at: string;
    verified: boolean;
    statuses_count: number;
    profile_image_url: string;
}
interface Metrics {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
    like_count: number;
}
export {};
