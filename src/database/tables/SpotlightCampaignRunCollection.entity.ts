import { ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';
import { Quest } from './Quest.entity';

@ObjectType()
@Entity({ name: 'spotlight_campaign_run_collections' })
@Unique('uq_spotlight_campaign_run_collections_run_collection', [
  'runId',
  'collectionAddress',
])
export class SpotlightCampaignRunCollection extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  runId!: string;

  @ManyToOne(() => SpotlightCampaignRun, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'runId', referencedColumnName: 'id' })
  run!: SpotlightCampaignRun;

  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Column('text')
  collectionName!: string;

  @Column('boolean', { default: false })
  isPrimary!: boolean;

  @Column('uuid')
  questId!: string;

  @ManyToOne(() => Quest, { onDelete: 'RESTRICT' })
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  quest!: Quest;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;
}
