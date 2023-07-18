import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Season, UserQuestProgress } from '.';

export enum QuestTrigger {
  SALE = 'Sale',
  ORDER = 'Order',
  UNISWAP = 'Uniswap',
  STAKING_REWARD = 'StakingReward',
  TRADING_REWARD = 'TradingReward',
  QUEST = 'Quest',
  REFERRAL = 'Referral',
  CART_ITEM = 'CartItem',
  TWITTER_POST = 'TwitterPost',
  TWITTER_LIKE = 'TwitterLike',
  TWITTER_RT = 'TwitterRT',
  CRON = 'Cron',
}

registerEnumType(QuestTrigger, {
  name: 'QuestTrigger',
});

export enum QuestRuleOperator {
  EQ = '=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  NEQ = '!=',
}

registerEnumType(QuestRuleOperator, {
  name: 'QuestRuleOperator',
});

@ObjectType()
export class QuestRule {
  @Field(() => String)
  property!: string;

  @Field(() => QuestRuleOperator)
  operator!: QuestRuleOperator;

  @Field(() => String)
  value!: string;

  @Field(() => String, { nullable: true })
  delta!: string | null;
}

@ObjectType()
export class QuestStep {
  @Field(() => QuestTrigger)
  trigger!: QuestTrigger;

  @Field(() => [QuestRule])
  @Type(() => QuestRule)
  rules!: QuestRule[];
}

export enum QuestPeriod {
  DAILY = 'day',
  SEASONAL = 'season',
}

registerEnumType(QuestPeriod, {
  name: 'QuestPeriod',
});

@ObjectType()
@Entity({ name: 'quests' })
export class Quest extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: number;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  @OneToOne(() => Quest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'previousQuestId', referencedColumnName: 'id' },
  ])
  previousQuestId!: string | null;

  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  prime!: boolean;

  @Field(() => [QuestStep])
  @Column('jsonb', { default: [] })
  @Type(() => QuestStep)
  steps!: QuestStep[];

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  loyaltyPoints!: string;

  @Field(() => Int)
  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  limit!: number;

  @Field(() => QuestPeriod)
  @Column('enum', { enum: QuestPeriod, enumName: 'quest_period' })
  period!: QuestPeriod;

  // GraphQL only fields

  @Field(() => Quest, { nullable: true })
  @Type(() => Quest)
  previousQuest?: Quest | null;

  @Field(() => Quest, { nullable: true })
  @Type(() => Quest)
  nextQuest?: Quest | null;

  @Field(() => [UserQuestProgress], { nullable: true })
  @Type(() => UserQuestProgress)
  progress?: UserQuestProgress[] | null;
}
