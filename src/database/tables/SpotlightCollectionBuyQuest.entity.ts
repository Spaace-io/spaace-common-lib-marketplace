import { ObjectType, Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Quest } from './Quest.entity';

@ObjectType()
@Entity({ name: 'spotlight_collection_buy_quests' })
@Unique('uq_spotlight_collection_buy_quests_season_collection', [
  'seasonNumber',
  'collectionAddress',
])
@Index('idx_spotlight_collection_buy_quests_collection', ['collectionAddress'])
@Index('idx_spotlight_collection_buy_quests_season', ['seasonNumber'])
export class SpotlightCollectionBuyQuest extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Field(() => String)
  @Column('text')
  collectionName!: string;

  @Field(() => String)
  @Column('uuid')
  questId!: string;

  @ManyToOne(() => Quest, { onDelete: 'RESTRICT' })
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  quest!: Quest;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  updatedAt!: Date;
}
