import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested, IsEnum } from 'class-validator';
import { QuestTrigger } from './Quest.entity';
import { Marketplace } from '../enums';
import { QuestAuditEvaluation } from './QuestAuditEvaluations.entity';

@ObjectType()
export class QuestAuditEventPayload {
  @Field(() => String, { nullable: true, description: 'Raw price in wei.' })
  priceWei?: string | null;

  @Field(() => String, { nullable: true, description: 'USD price if known.' })
  usdPrice?: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'ERC20 currency address.',
  })
  currency?: string | null;
}

@ObjectType()
@Entity({ name: 'quest_audit_events' })
@Index(['userAddress', 'occurredAt', 'id'], {
  where: '"userAddress" IS NOT NULL',
})
@Index(['userAddress', 'processedAt', 'id'], {
  where: '"userAddress" IS NOT NULL',
})
@Index(['txHash', 'logIdx'], {
  where: '"txHash" IS NOT NULL AND "logIdx" IS NOT NULL',
})
@Index(['orderHash'], { where: '"orderHash" IS NOT NULL' })
export class QuestAuditEvent extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Field(() => String, { description: 'Season number (string numeric).' })
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @Field(() => String, {
    description: 'User address (stored lowercased, without 0x).',
  })
  @Column('char', { length: 40 })
  userAddress!: string;

  @Field(() => QuestTrigger, {
    description: 'Quest trigger that was processed.',
  })
  @Column('enum', {
    enum: QuestTrigger,
    enumName: 'quest_trigger',
  })
  @IsEnum(QuestTrigger)
  trigger!: QuestTrigger;

  @Field(() => GraphQLISODateTime, { description: 'Underlying fact time.' })
  @Column('timestamp without time zone')
  occurredAt!: Date;

  @Field(() => GraphQLISODateTime, {
    description: 'When our service processed this event (audit created).',
  })
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  processedAt!: Date;

  @Field(() => String, {
    nullable: true,
    description: 'txHash for sale-like events',
  })
  @Column('char', { length: 64, nullable: true })
  txHash!: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'logIdx for sale-like events',
  })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  logIdx!: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'order hash for listing/order events',
  })
  @Column('char', { length: 64, nullable: true })
  orderHash!: string | null;

  @Field(() => String)
  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  tokenId!: string;

  @Field(() => Marketplace, { nullable: true })
  @Column('enum', {
    enum: Marketplace,
    enumName: 'marketplace',
    nullable: true,
  })
  @IsEnum(Marketplace)
  marketplace!: Marketplace | null;

  @Field(() => QuestAuditEventPayload, { nullable: true })
  @Column('jsonb', { default: () => "'{}'::jsonb" })
  @Type(() => QuestAuditEventPayload)
  @ValidateNested()
  payload!: QuestAuditEventPayload;

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  durationMs!: number | null;

  @Field(() => GraphQLISODateTime)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToMany(() => QuestAuditEvaluation, (e) => e.event, { cascade: false })
  evaluations?: QuestAuditEvaluation[];
}
