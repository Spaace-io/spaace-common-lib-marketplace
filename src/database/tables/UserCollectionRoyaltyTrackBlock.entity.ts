import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user_collection_royalty_track_block' })
export class UserCollectionRoyaltyTrackBlock extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('bigint', { default: 0 })
  lastProcessedId!: number;

  @Field(() => Date)
  @Column('timestamptz', { default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
