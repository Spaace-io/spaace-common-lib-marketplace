import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ClaimStatus {
  PENDING = 'pending', // Pending claim
  COMPLETED = 'completed', // Successfully claimed
  FAILED = 'failed', // Failed to claim
}

registerEnumType(ClaimStatus, {
  name: 'ClaimStatus',
});

@ObjectType()
@Entity({
  name: 'referral_reward_claims',
})
export class ReferralRewardClaims extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('char')
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  referrerAddress: string; // Referrer address

  @Field(() => String)
  @Column('char')
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  recipientAddress: string; // Recipient address

  @Field(() => String)
  @Column('numeric', { precision: 78 })
  amount: string; // Amount in Wei

  @Field(() => ClaimStatus)
  @Column('enum', { enum: ClaimStatus, default: ClaimStatus.PENDING })
  status: ClaimStatus; // pending | completed | failed

  @Field(() => String, { nullable: true })
  @Column('char', { nullable: true, default: null })
  txHash: string | null; // Transaction hash

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true, default: null })
  @Transform(({ value }) => (value ? new Date(value) : null), {
    toPlainOnly: true,
  })
  completedAt: Date | null;
}
