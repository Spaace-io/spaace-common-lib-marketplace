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

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Season } from '.';
import { ValidateNested } from 'class-validator';

export enum QuestTrigger {
  TOKEN_TRANSFER = 'TOKEN_TRANSFER',
  UNISWAP = 'UNISWAP',
  TRANSFER = 'TRANSFER',
  SALE = 'SALE',
  ORDER = 'ORDER',
  USER = 'USER',
  STAKING_DEPOSIT = 'STAKING_DEPOSIT',
  DISTRIBUTOR_REWARD = 'DISTRIBUTOR_REWARD',
  USER_QUEST_PROGRESS = 'USER_QUEST_PROGRESS',
  REFERRAL = 'REFERRAL',
  CART_ITEM = 'CART_ITEM',
  USER_INTERACTION = 'USER_INTERACTION',
  DATA_COMPILED = 'DATA_COMPILED',
  CRON = 'CRON',
}

registerEnumType(QuestTrigger, {
  name: 'QuestTrigger',
});

export enum QuestRuleOperator {
  EQ = 'EQ',
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  NEQ = 'NEQ',
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
  @ValidateNested({ each: true })
  rules!: QuestRule[];

  @Field(() => String, { defaultValue: '1' })
  count?: string;
}

export enum QuestPeriod {
  DAILY = 'DAILY',
  SEASONAL = 'SEASONAL',
}

registerEnumType(QuestPeriod, {
  name: 'QuestPeriod',
});

@ObjectType()
@Entity({ name: 'quests' })
@Unique(['seasonNumber', 'name'])
export class Quest extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  name!: string;

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
  @ValidateNested({ each: true })
  steps!: QuestStep[];

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyPoints!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  boost!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  boostLimit!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  limit!: string;

  @Field(() => QuestPeriod)
  @Column('enum', { enum: QuestPeriod, enumName: 'quest_period' })
  period!: QuestPeriod;
}
