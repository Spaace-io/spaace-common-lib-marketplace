import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'referral_rewards' })
export class ReferralReward extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  user!: string;

  @Field(() => Date)
  @PrimaryColumn('date', { default: () => 'CURRENT_DATE' })
  date!: Date;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  referrer!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  referrerAmount!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  referredAmount!: string;
}
