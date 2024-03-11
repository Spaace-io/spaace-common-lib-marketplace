import { TwitterUserv2 } from './TwitterUser';

export interface ReplyUsersResponse {
  id: string;
  author_id: string;
}
export interface TweetsStatsResponse {
  data?: (TwitterUserv2 | ReplyUsersResponse)[];
  meta: {
    result_count: number;
    next_token: string;
    previous_token: string;
  };
}
