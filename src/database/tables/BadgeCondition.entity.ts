import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BadgeEntity } from './Badge.entity';

export enum BadgeConditionType {
  // Purchase-related
  BUY_COUNT_ON_SPAACE = 'BUY_COUNT_ON_SPAACE',
  BUY_DISTINCT_COLLECTIONS_ON_SPAACE = 'BUY_DISTINCT_COLLECTIONS_ON_SPAACE',
  BUY_SAME_COLLECTION_COUNT = 'BUY_SAME_COLLECTION_COUNT',
  BLUECHIP_BUY_COUNT_ON_SPAACE = 'BLUECHIP_BUY_COUNT_ON_SPAACE',

  // Selling-related
  SELL_COUNT_ON_SPAACE = 'SELL_COUNT_ON_SPAACE',
  SELL_LOSS_ON_SPAACE = 'SELL_LOSS_ON_SPAACE',

  // Listing-related
  LIST_COUNT_ON_SPAACE = 'LIST_COUNT_ON_SPAACE',

  // Volume-related
  TRADING_VOLUME_ETH = 'TRADING_VOLUME_ETH',

  // Quest-related
  QUEST_COMPLETED = 'QUEST_COMPLETED',
  QUEST_COMPLETED_COUNT = 'QUEST_COMPLETED_COUNT',
  DAILY_QUEST_STREAK = 'DAILY_QUEST_STREAK',

  // Social
  ACTIVE_REFERRALS_COUNT = 'ACTIVE_REFERRALS_COUNT',

  // Time-based
  CONNECTED_BEFORE_DATE = 'CONNECTED_BEFORE_DATE',
  ACTIVE_DURING_PERIOD = 'ACTIVE_DURING_PERIOD',
}

@ObjectType()
@Entity({ name: 'badge_conditions' })
@Index('IDX_badge_conditions_badge_id', ['badgeId'])
@Index('IDX_badge_conditions_type', ['conditionType'])
export class BadgeConditionEntity extends BaseEntity {
  @Field(() => String, {
    description: 'Unique identifier for the condition',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, {
    description: 'ID of the badge this condition belongs to',
  })
  @Column('uuid', { name: 'badge_id' })
  badgeId!: string;

  @Field(() => String, {
    description:
      'Type of condition (e.g., BUY_COUNT_ON_SPAACE, DAILY_QUEST_STREAK)',
  })
  @Column('enum', {
    enum: BadgeConditionType,
    enumName: 'badge_condition_type',
    name: 'condition_type',
  })
  conditionType!: BadgeConditionType;

  @Field(() => String, {
    description:
      'Condition parameters as JSON (e.g., {"min_count": 10, "min_collections": 5})',
  })
  @Column('jsonb', { default: '{}', name: 'params_json' })
  paramsJson!: Record<string, unknown>;

  @Field(() => String, {
    description:
      'Logical operator for combining with other conditions (AND/OR)',
  })
  @Column('varchar', { length: 10, default: 'AND', name: 'logical_operator' })
  logicalOperator!: 'AND' | 'OR';

  @Field(() => Number, {
    description: 'Group number for complex condition logic',
  })
  @Column('int', { default: 1, name: 'condition_group' })
  conditionGroup!: number;

  @Field(() => Date, {
    description: 'When the condition was created',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Field(() => Date, {
    description: 'When the condition was last updated',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => BadgeEntity, (badge) => badge.conditions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'badge_id' })
  badge?: BadgeEntity;
}
