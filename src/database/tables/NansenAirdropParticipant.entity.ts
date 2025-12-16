import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
} from 'typeorm';
import { NansenTier, NansenRewardType } from '../enums/NansenAirdrop.enum';

@ObjectType()
@Entity({ name: 'nansen_airdrop_participants' })
@Index('IDX_nansen_participants_wallet', ['walletAddress'])
@Index('IDX_nansen_participants_tier', ['nansenTier'])
@Index('IDX_nansen_participants_reward_type', ['rewardType'])
export class NansenAirdropParticipant extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar', { length: 42, unique: true })
  walletAddress!: string;

  @Field(() => NansenTier)
  @Column('enum', { enum: NansenTier, enumName: 'nansen_tier' })
  nansenTier!: NansenTier;

  @Field(() => NansenRewardType)
  @Column('enum', { enum: NansenRewardType, enumName: 'nansen_reward_type' })
  rewardType!: NansenRewardType;

  // Multiplier fields (for green tier)
  @Field(() => Number, { nullable: true })
  @Column('numeric', { precision: 4, scale: 2, nullable: true })
  multiplierValue!: number | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  multiplierActivatedAt!: Date | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  multiplierExpiresAt!: Date | null;

  // Tweet validation
  @Field(() => Boolean)
  @Column('boolean', { default: false })
  requiresTweet!: boolean;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  tweetUrl!: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  tweetVerifiedAt!: Date | null;

  // Meta
  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  eligibilityCheckedAt!: Date;

  @Column('jsonb', { nullable: true })
  nansenApiResponse!: Record<string, unknown> | null;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
