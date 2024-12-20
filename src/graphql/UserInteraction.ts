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
}
