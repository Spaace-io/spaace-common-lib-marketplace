import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ethers } from 'ethers';
import { SeasonRank } from '.';
import { ValidateNested } from 'class-validator';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => String)
  @Column('text', { unique: true })
  referralCode!: string;

  @Field(() => String, { nullable: true })
  @Column('char', { length: 40, nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'referrerAddress', referencedColumnName: 'address' })
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  referrerAddress!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
  loyaltyPoints!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyRewards!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyRewardsClaimed!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  // GraphQL only fields

  @Field(() => SeasonRank, { nullable: true })
  @Type(() => SeasonRank)
  @ValidateNested()
  rank?: SeasonRank | null;

  @Field(() => User, { nullable: true })
  @Type(() => User)
  @ValidateNested()
  referrer?: User | null;
}
