import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_spaace_onboarding_tweet_likes' })
export class ArenaSpaaceOnboardingTweetLikes extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  userTwitter!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;
}
