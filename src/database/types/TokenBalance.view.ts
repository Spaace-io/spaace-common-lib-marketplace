import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, Index, ViewColumn, ViewEntity } from 'typeorm';
import { utils } from '../..';
import { TokenTransferEntity } from '../tables';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (query) =>
          query
            .from(TokenTransferEntity, 'transfer')
            .select('"currency"')
            .addSelect('"to"', 'userAddress')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"currency"')
            .addGroupBy('"to"'),
        'received',
      )
      .leftJoin(
        (query) =>
          query
            .from(TokenTransferEntity, 'transfer')
            .select('"currency"')
            .addSelect('"from"', 'userAddress')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"currency"')
            .addGroupBy('"from"'),
        'sent',
        '"sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress"',
      )
      .select('"received"."currency"')
      .addSelect('"received"."userAddress"')
      .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
      .where('"received"."total" > COALESCE("sent"."total", 0)')
      .andWhere(
        `"received"."userAddress" <> '${utils.strip0x(
          ethers.constants.AddressZero,
        )}'`,
      );
  },
  name: 'token_balances_view',
})
@Index(['userAddress', 'currency'])
export class TokenBalance extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => String)
  @ViewColumn()
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;
}
