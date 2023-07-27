import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Season, UserQuestProgress } from '.';
import { ValidateNested } from 'class-validator';

export enum QuestTrigger {
  SALE = 'Sale',
  TRANSFER = 'Transfer',
  ORDER = 'Order',
  UNISWAP = 'Uniswap',
  STAKING_DEPOSIT = 'StakingDeposit',
  STAKING_REWARD = 'StakingReward',
  DISTRIBUTOR_REWARD = 'DistributorReward',
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
  @ValidateNested()
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
@Unique(['seasonNumber', 'name'])
export class Quest extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: number;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => String)
  @Column('text')
  description!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  @OneToOne(() => Quest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'previousQuestId', referencedColumnName: 'id' },
  ])
  previousQuestId!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  prime!: boolean;

  @Field(() => [QuestStep])
  @Column('jsonb', { default: [] })
  @Type(() => QuestStep)
  @ValidateNested()
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
  @ValidateNested()
  previousQuest?: Quest | null;

  @Field(() => Quest, { nullable: true })
  @Type(() => Quest)
  @ValidateNested()
  nextQuest?: Quest | null;

  @Field(() => [UserQuestProgress], { nullable: true })
  @Type(() => UserQuestProgress)
  @ValidateNested()
  progress?: UserQuestProgress[] | null;
}
