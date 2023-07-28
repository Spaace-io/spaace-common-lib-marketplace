import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

export enum DistributorContract {
  TRADING_REWARDS = 'Trading',
  REFERRAL_REWARDS = 'Referral',
  LOYALTY_REWARDS = 'Loyalty',
}

registerEnumType(DistributorContract, {
  name: 'DistributorContract',
});

@ObjectType()
@Entity({ name: 'distributor_rewards' })
export class DistributorReward extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => DistributorContract)
  @PrimaryColumn('enum', {
    enum: DistributorContract,
    enumName: 'distributor_contract',
  })
  distributor!: DistributorContract;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  amount!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp!: Date;

  @Field(() => String, { nullable: true })
  @Column('char', { length: 64, nullable: true })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  harvestTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  harvestLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  harvestTimestamp!: Date | null;
}
