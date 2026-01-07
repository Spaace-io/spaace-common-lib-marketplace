import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum SpotlightCampaignEventType {
  NEW_RUN = 'NEW_RUN',
  ACTIVATE = 'ACTIVATE',
  DEACTIVATE = 'DEACTIVATE',
  UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN',
  UPDATE_RUN = 'UPDATE_RUN',
}

registerEnumType(SpotlightCampaignEventType, {
  name: 'SpotlightCampaignEventType',
});

@ObjectType()
@Entity({ name: 'spotlight_campaign_events' })
export class SpotlightCampaignEvent extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid')
  campaignId!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  runId!: string | null;

  @Field(() => SpotlightCampaignEventType)
  @Column({
    type: 'enum',
    enum: SpotlightCampaignEventType,
    enumName: 'spotlight_campaign_event_type_enum',
  })
  type!: SpotlightCampaignEventType;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  note!: string | null;

  @Field(() => Object)
  @Column('jsonb', { default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;

  @Field(() => Date)
  @Column('timestamptz', { default: () => 'NOW()' })
  createdAt!: Date;
}
