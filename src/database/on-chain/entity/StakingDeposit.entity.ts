import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'staking_deposits' })
export class StakingDeposit extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  user!: string;

  @Field()
  @PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Field()
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  pool!: string;

  @Field()
  @Column('numeric', { precision: 78 })
  amount!: string;
}
