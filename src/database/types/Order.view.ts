import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { BalanceEntity, OrderEntity, OrderType } from '../tables';
import { Sale } from './Sale.view';
import { TokenBalance } from './TokenBalance.view';
import { utils } from '../..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .select('"order".*')
      .addSelect(
        (query) =>
          query
            .fromDummy()
            .select(
              `"order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS ${query
                .subQuery()
                .from(Sale, 'sale')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()} AND "order"."currency" IN ('${utils.strip0x(
                ethers.constants.AddressZero,
              )}', '${utils.strip0x(
                utils.constants.WETH_ADDRESS,
              )}') AND CASE WHEN "order"."type" = '${
                OrderType.DUTCH_AUCTION
              }' THEN COALESCE(${query
                .subQuery()
                .select('"balance"."balance"')
                .from(TokenBalance, 'balance')
                .where('"balance"."currency" = "order"."currency"')
                .andWhere('"balance"."userAddress" = "order"."userAddress"')
                .getQuery()}, 0) > "order"."price" ELSE COALESCE(${query
                .subQuery()
                .select('"balance"."balance"')
                .from(BalanceEntity, 'balance')
                .where('"balance"."userAddress" = "order"."userAddress"')
                .andWhere(
                  '"balance"."collectionAddress" = "order"."collectionAddress"',
                )
                .andWhere('"balance"."tokenId" = "order"."tokenId"')
                .getQuery()}, 0) > 0 END`,
            ),
        'active',
      );
  },
  name: 'orders_view',
})
export class Order extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  hash!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  tokenId!: string | null;

  @Field(() => OrderType)
  @ViewColumn()
  type!: OrderType;

  @Field(() => String)
  @ViewColumn()
  price!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingPrice!: string | null;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => Date)
  @ViewColumn()
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  endTime!: Date | null;

  @Field(() => String)
  @ViewColumn()
  counter!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) =>
      value !== null
        ? ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null,
    {
      toPlainOnly: true,
    },
  )
  cancelTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  cancelLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  cancelTimestamp!: Date | null;

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;
}
