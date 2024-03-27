import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_spaace_tweet' })
export class ArenaSpaaceTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;

  @Field(() => String)
  @Column('text')
  likePaginationToken!: string;

  @Field(() => String)
  @Column('text')
  replyPaginationToken!: string;

  @Field(() => String)
  @Column('text')
  quotePaginationToken!: string;

  @Field(() => String)
  @Column('text')
  retweetPaginationToken!: string;

  @Column('boolean', { default: false })
  postOfTheDay!: boolean;

  @Column('boolean', { default: false })
  primePost!: boolean;

  @Column('boolean', { default: false })
  onboardingPost!: boolean;
}
