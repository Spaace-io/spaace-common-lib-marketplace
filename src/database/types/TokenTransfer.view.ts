import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { TokenTransferEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(TokenTransferEntity, 'transfer')
      .select('"transfer"."txHash"', 'txHash')
      .addSelect('"transfer"."logIdx"', 'logIdx')
      .addSelect('"transfer"."from"', 'from')
      .addSelect('"transfer"."to"', 'to')
      .addSelect('"transfer"."currency"', 'currency')
      .addSelect('"transfer"."amount"', 'amount')
      .addSelect('"transfer"."timestamp"', 'timestamp');
  },
  name: 'token_transfers_view',
})
export class TokenTransfer extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  txHash!: string;

  @Field(() => String)
  @ViewColumn()
  logIdx!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  from!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  to!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => String)
  @ViewColumn()
  amount!: string;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;
}
