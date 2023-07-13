import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';
import { ethers } from 'ethers';
import { SeasonRank } from '.';

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
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyPoints!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyRewards!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  loyaltyRewardsClaimed!: string;

  // GraphQL only fields

  @Field(() => SeasonRank, { nullable: true })
  @Type(() => SeasonRank)
  rank?: SeasonRank | null;
}
