import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { TweetAction } from '../database/enums';

export enum UserInteractionType {
  DAILY_CLAIM = 'DAILY_CLAIM',
  BUY_NOW = 'BUY_NOW',
  SELL_INSTANTLY = 'SELL_INSTANTLY',
  SWEEP_FLOOR = 'SWEEP_FLOOR',
  TWEET_ACTION = 'TWEET_ACTION',
  SHARE_CARD = 'SHARE_CARD',
  LINK_TWITTER = 'LINK_TWITTER',
  FOLLOW_TWITTER_SPAACE = 'FOLLOW_TWITTER_SPAACE',
  LINK_DISCORD = 'LINK_DISCORD',
  FOLLOW_DISCORD_SPAACE = 'FOLLOW_DISCORD_SPAACE',
}

registerEnumType(UserInteractionType, {
  name: 'UserInteractionType',
});

@ObjectType()
export class UserInteraction {
  @Field(() => UserInteractionType)
  type!: UserInteractionType;

  @Field(() => String)
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => TweetAction, { nullable: true })
  tweetAction!: TweetAction | null;

  @Field(() => String, { nullable: true })
  tweetId!: string | null;

  @Field(() => String, { nullable: true })
  twitterHandle!: string | null;

  @Field(() => String, { nullable: true })
  followTarget!: string | null;
}
