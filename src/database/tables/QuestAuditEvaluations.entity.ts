import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsEnum } from 'class-validator';
import { QuestPeriod, QuestRuleOperator, QuestTrigger } from './Quest.entity';
import { QuestAuditEvent } from './QuestAuditEvent.entity';
import { QuestType } from '../enums';

export enum QuestAuditStatus {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  INDETERMINATE = 'INDETERMINATE',
  SKIPPED = 'SKIPPED',
}
registerEnumType(QuestAuditStatus, { name: 'QuestAuditStatus' });

@ObjectType()
export class QuestAuditRuleResult {
  @Field(() => String)
  property!: string;

  @Field(() => QuestRuleOperator)
  operator!: QuestRuleOperator;

  @Field(() => String)
  expected!: string;

  @Field(() => String, { nullable: true })
  actual!: string | null;

  @Field(() => Boolean)
  passed!: boolean;

  @Field(() => String, { nullable: true })
  reason!: string | null;
}

@ObjectType()
@Entity({ name: 'quest_audit_evaluations' })
@Index(['eventId'])
@Index(['userAddress', 'createdAt', 'id'])
@Index(['questId', 'createdAt', 'id'])
@Index(['status', 'createdAt', 'id'])
export class QuestAuditEvaluation extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Field(() => String)
  @Column('bigint')
  eventId!: string;

  @ManyToOne(() => QuestAuditEvent, (e) => e.evaluations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  event!: QuestAuditEvent;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  userAddress!: string;

  @Field(() => QuestTrigger)
  @Column('enum', { enum: QuestTrigger, enumName: 'quest_trigger' })
  @IsEnum(QuestTrigger)
  trigger!: QuestTrigger;

  @Field(() => String)
  @Column('uuid')
  questId!: string;

  @Field(() => String)
  @Column('text')
  questName!: string;

  @Field(() => QuestType)
  @Column('enum', { enum: QuestType, enumName: 'quest_type' })
  @IsEnum(QuestType)
  questType!: QuestType;

  @Field(() => QuestPeriod)
  @Column('enum', { enum: QuestPeriod, enumName: 'quest_period' })
  @IsEnum(QuestPeriod)
  period!: QuestPeriod;

  @Field(() => QuestAuditStatus)
  @Column('enum', { enum: QuestAuditStatus, enumName: 'quest_audit_status' })
  @IsEnum(QuestAuditStatus)
  status!: QuestAuditStatus;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  awardedPoints!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 2, default: 1.0 })
  multiplier!: number;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  userQuestProgressNonce!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  questRevision!: string | null;

  @Field(() => [QuestAuditRuleResult])
  @Column('jsonb', { default: () => "'[]'::jsonb" })
  @Type(() => QuestAuditRuleResult)
  @ValidateNested({ each: true })
  ruleResults!: QuestAuditRuleResult[];

  @Field(() => GraphQLISODateTime)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
