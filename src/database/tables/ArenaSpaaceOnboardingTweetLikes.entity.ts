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
@Entity({ name: 'arena_spaace_tweet' })
export class ArenaSpaaceTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  @OneToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitter', referencedColumnName: 'userTwitterId' })
  userTwitter!: string;
}
