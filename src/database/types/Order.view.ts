import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import {
  BalanceEntity,
  Marketplace,
  OrderEntity,
  OrderType,
  SaleEntity,
  TokenBalanceEntity,
} from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .select('"order"."hash"', 'hash')
      .addSelect('"order"."userAddress"', 'userAddress')
      .addSelect('"order"."collectionAddress"', 'collectionAddress')
      .addSelect('"order"."tokenId"', 'tokenId')
      .addSelect('"order"."type"', 'type')
      .addSelect('"order"."marketplace"', 'marketplace')
      .addSelect('"order"."price"', 'price')
      .addSelect('"order"."startingPrice"', 'startingPrice')
      .addSelect('"order"."currency"', 'currency')
      .addSelect('"order"."startTime"', 'startTime')
      .addSelect('"order"."endTime"', 'endTime')
      .addSelect('"order"."counter"', 'counter')
      .addSelect('"order"."signature"', 'signature')
      .addSelect('"order"."cancelTxHash"', 'cancelTxHash')
      .addSelect('"order"."cancelLogIdx"', 'cancelLogIdx')
      .addSelect('"order"."cancelTimestamp"', 'cancelTimestamp')
      .addSelect('"order"."royalties"', 'royalties')
      .addSelect('"order"."startingRoyalties"', 'startingRoyalties')
      .addSelect(
        (query) =>
          query
            .fromDummy()
            .select(
              `"order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS ${query
                .subQuery()
                .from(SaleEntity, 'sale')
                .select('1')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()} AND CASE "order"."type" WHEN '${
                OrderType.BID
              }' THEN COALESCE(${query
                .subQuery()
                .select('"balance"."balance"')
                .from(TokenBalanceEntity, 'balance')
                .where('"balance"."currency" = "order"."currency"')
                .andWhere('"balance"."userAddress" = "order"."userAddress"')
                .andWhere('"balance"."balance" > 0')
                .getQuery()}, 0) >= "order"."price" ELSE COALESCE(${query
                .subQuery()
                .select('"balance"."balance"')
                .from(BalanceEntity, 'balance')
                .where('"balance"."userAddress" = "order"."userAddress"')
                .andWhere(
                  '"balance"."collectionAddress" = "order"."collectionAddress"',
                )
                .andWhere('"balance"."tokenId" = "order"."tokenId"')
                .andWhere('"balance"."balance" > 0')
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

  @Field(() => Marketplace)
  @ViewColumn()
  marketplace!: Marketplace;

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

  @Field(() => String)
  @ViewColumn()
  royalties!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingRoyalties!: string | null;
}
