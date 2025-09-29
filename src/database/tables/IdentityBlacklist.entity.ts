// src/moderation/identity-blacklist.entity.ts
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { IdentifierType } from '../enums/IdentifierType.enum';

@ObjectType()
@Entity({ name: 'identity_blacklist' })
@Unique('uq_ibl_type_value', ['identifierType', 'identifierValue'])
@Index('idx_ibl_type_value', ['identifierType', 'identifierValue'])
export class IdentityBlacklist extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Field(() => IdentifierType)
  @Column({
    type: 'enum',
    enum: IdentifierType,
    enumName: 'identifier_type_enum',
  })
  identifierType!: IdentifierType;

  @Field(() => String)
  @Column('text')
  identifierValue!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  reason!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  createdBy!: string | null;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;
}
