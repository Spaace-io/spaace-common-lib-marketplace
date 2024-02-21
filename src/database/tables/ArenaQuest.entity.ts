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
import { LoyaltyRank, Season } from '.';
import { ValidateNested } from 'class-validator';

export enum ArenaQuestTrigger {
  USER = 'USER',
  USER_QUEST_PROGRESS = 'USER_QUEST_PROGRESS',
  REFERRAL = 'REFERRAL',
}

registerEnumType(ArenaQuestTrigger, {
  name: 'QuestTrigger',
});

export enum ArenaQuestRuleOperator {
  EQ = 'EQ',
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  NEQ = 'NEQ',
}

registerEnumType(ArenaQuestRuleOperator, {
  name: 'QuestRuleOperator',
});

@ObjectType()
export class ArenaQuestRule {
  @Field(() => String)
  property!: string;

  @Field(() => ArenaQuestRuleOperator)
  operator!: ArenaQuestRuleOperator;

  @Field(() => String)
  value!: string;

  @Field(() => String, { nullable: true })
  delta!: string | null;
}

@ObjectType()
export class ArenaQuestStep {
  @Field(() => ArenaQuestTrigger)
  trigger!: ArenaQuestTrigger;

  @Field(() => [ArenaQuestRule])
  @Type(() => ArenaQuestRule)
  @ValidateNested({ each: true })
  rules!: ArenaQuestRule[];

  @Field(() => Boolean, { defaultValue: false })
  cron?: boolean;
}

export enum ArenaQuestPeriod {
  DAILY = 'DAILY',
  SEASONAL = 'SEASONAL',
}

registerEnumType(ArenaQuestPeriod, {
  name: 'ArenaQuestPeriod',
});

@ObjectType()
@Entity({ name: 'arena-quests' })
@Unique(['seasonNumber', 'name'])
export class AreanaQuest extends BaseEntity {
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
  @OneToOne(() => AreanaQuest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'previousQuestId', referencedColumnName: 'id' },
  ])
  previousQuestId!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  count!: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  prime!: boolean;

  @Field(() => [ArenaQuestStep])
  @Column('jsonb', { default: [] })
  @Type(() => ArenaQuestStep)
  @ValidateNested({ each: true })
  steps!: ArenaQuestStep[];

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

  @Field(() => ArenaQuestPeriod)
  @Column('enum', { enum: ArenaQuestPeriod, enumName: 'quest_period' })
  period!: ArenaQuestPeriod;

  @Field(() => LoyaltyRank)
  @Column('enum', {
    enum: LoyaltyRank,
    enumName: 'loyalty_rank',
    default: LoyaltyRank.BRONZE_5,
  })
  rank!: LoyaltyRank;
}
