import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Unique,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SpotlightCampaignRun } from './SpotlightCampaignRun.entity';
import { User } from './User.entity';
import { PartnerChestTier } from './PartnerChestTier.entity';

@ObjectType()
@Entity({ name: 'partner_chest_user_runs' })
@Unique('uq_partner_chest_user_run', ['userAddress', 'campaignRunId'])
@Index(['userAddress'])
@Index(['campaignRunId'])
export class PartnerChestUserRun extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  userAddress!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  user!: User;

  @Field(() => String)
  @Column('uuid')
  campaignRunId!: string;

  @ManyToOne(() => SpotlightCampaignRun, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaignRunId', referencedColumnName: 'id' })
  campaignRun!: SpotlightCampaignRun;

  @Field(() => String)
  @Column('uuid')
  assignedTierId!: string;

  @ManyToOne(() => PartnerChestTier, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'assignedTierId', referencedColumnName: 'id' })
  assignedTier!: PartnerChestTier;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  assignedAt!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 18, nullable: true })
  holdingsValueEth!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 2, nullable: true })
  holdingsValueUsd!: string | null;

  @Field(() => Object, { nullable: true })
  @Column('jsonb', { nullable: true })
  snapshot!: Record<string, unknown> | null;
}
