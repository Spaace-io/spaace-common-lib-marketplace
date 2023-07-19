import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'trading_rewards' })
export class TradingReward extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Date)
  @PrimaryColumn('date', { default: () => 'CURRENT_DATE' })
  date!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  buyAmount!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  sellAmount!: string;
}
