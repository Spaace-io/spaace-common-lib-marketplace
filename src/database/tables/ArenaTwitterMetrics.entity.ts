import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_twitter_metrics' })
export class ArenaTwitterMetrics extends BaseEntity {
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
}
