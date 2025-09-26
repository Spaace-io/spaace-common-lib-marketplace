import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { ModerationAction } from '../enums/ModerationAction.enum';

@ObjectType()
@Entity({ name: 'moderation_audit' })
@Index('idx_mod_audit_action', ['action', 'createdAt'])
export class ModerationAudit extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Field(() => ModerationAction)
  @Column({
    type: 'enum',
    enum: ModerationAction,
    enumName: 'moderation_action_enum',
  })
  action!: ModerationAction;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  wallet!: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  details!: Record<string, unknown> | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  actedBy!: string | null;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
