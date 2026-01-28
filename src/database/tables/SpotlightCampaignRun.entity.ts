import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpotlightCampaign } from './SpotlightCampaign.entity';
import { SpotlightCampaignRunCollection } from './SpotlightCampaignRunCollection.entity';

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

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validFrom!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone')
  validTo!: Date;

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  isCurrent!: boolean;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 2, default: 2.0 })
  multiplier!: number;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;

  @OneToMany(() => SpotlightCampaignRunCollection, (rc) => rc.run)
  runCollections!: SpotlightCampaignRunCollection[];
}
