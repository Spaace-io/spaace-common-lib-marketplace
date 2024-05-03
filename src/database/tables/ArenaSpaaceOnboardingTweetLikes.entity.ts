import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';

@ObjectType()
@Entity({ name: 'arena_spaace_onboarding_tweet_likes' })
export class ArenaSpaaceOnboardingTweetLikes extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @OneToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitter', referencedColumnName: 'userTwitterId' })
  userTwitter!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;
}
