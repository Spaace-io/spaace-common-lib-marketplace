import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'referral_rewards' })
export class ReferralReward extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  user!: string;

  @Field()
  @PrimaryColumn('date', { default: () => 'CURRENT_DATE' })
  date!: Date;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  referrer!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  referrerAmount!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  referredAmount!: string;
}
