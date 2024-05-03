import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column, Index } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_spaace_tweet' })
export class ArenaSpaaceTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  tweetId!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  likePaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  replyPaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  quotePaginationToken!: string;

  @Field(() => String, { nullable: true })
  @Column('text')
  retweetPaginationToken!: string;

  @Column('boolean', { default: false })
  @Index()
  postOfTheDay!: boolean;

  @Column('boolean', { default: false })
  @Index()
  primePost!: boolean;

  @Column('boolean', { default: false })
  @Index()
  onboardingPost!: boolean;
}
