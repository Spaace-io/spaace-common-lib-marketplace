import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'staking_deposits' })
export class StakingDeposit extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Date)
  @PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  pool!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78 })
  amount!: string;
}
