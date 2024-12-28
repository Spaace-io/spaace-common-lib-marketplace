import { registerEnumType } from '@nestjs/graphql';

export enum TweetAction {
  LIKE = 'LIKE',
  REPLY = 'REPLY',
  REPOST = 'REPOST',
}

registerEnumType(TweetAction, {
  name: 'TweetAction',
});
