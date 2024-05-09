import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_spaace_onboarding_tweet_likes' })
export class ArenaSpaaceOnboardingTweetLikes extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  userTwitter!: string;

  @Field(() => String)
  @Column('text')
  tweetId!: string;

  @Field(() => String)
  @Column('text')
  actionType!: string;
}
