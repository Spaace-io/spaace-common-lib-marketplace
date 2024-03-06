import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_tweet' })
export class ArenaTweet extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  id!: string;

  @Field(() => String)
  @Column('text')
  authorId!: string;

  @Field(() => String)
  @Column('text')
  text!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  likeCount!: number;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  replyCount!: number;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  retweetCount!: number;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  viewCount!: number;
}
