import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpotlightCampaign } from './SpotlightCampaign.entity';

@ObjectType()
@Entity({ name: 'spotlight_campaign_runs' })
export class SpotlightCampaignRun extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid')
  campaignId!: string;

  @ManyToOne(() => SpotlightCampaign, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'campaignId', referencedColumnName: 'id' })
  campaign!: SpotlightCampaign;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validFrom!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validTo!: Date;

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  isCurrent!: boolean;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;
}
