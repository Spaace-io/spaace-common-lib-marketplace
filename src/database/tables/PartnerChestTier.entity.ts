import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';

@ObjectType()
@Entity({ name: 'partner_chest_tiers' })
@Unique('uq_partner_chest_tier_run_number', ['campaignRunId', 'tierNumber'])
export class PartnerChestTier extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid')
  campaignRunId!: string;

  @ManyToOne(() => SpotlightCampaignRun, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaignRunId', referencedColumnName: 'id' })
  campaignRun!: SpotlightCampaignRun;

  @Field(() => Int)
  @Column('smallint')
  tierNumber!: number;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 18, default: '0' })
  thresholdEth!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  label!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  active!: boolean;
}
