import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'collection_user_votes' })
export class CollectionUserVoteEntity extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Field(() => Number)
  @Column('smallint')
  voteType!: number;

  @Field(() => Date)
  @PrimaryColumn('timestamp without time zone', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp!: Date;
}
