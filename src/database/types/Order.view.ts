import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Brackets,
  DataSource,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { ActiveOrderCachedEntity, OrderEntity, OrderItemEntity } from '..';
import { Marketplace, OrderType } from '../enums';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .select('"order"."hash"', 'hash')
      .addSelect('"order"."userAddress"', 'userAddress')
      .addSelect('"order"."collectionAddress"', 'collectionAddress')
      .addSelect('"order"."type"', 'type')
      .addSelect('"order"."marketplace"', 'marketplace')
      .addSelect('"order"."price"', 'price')
      .addSelect('"order"."startingPrice"', 'startingPrice')
      .addSelect('"order"."currency"', 'currency')
      .addSelect('"order"."marketplaceFeeBps"', 'marketplaceFeeBps')
      .addSelect('"order"."marketplaceFeeReceiver"', 'marketplaceFeeReceiver')
      .addSelect('"order"."royaltiesBps"', 'royaltiesBps')
      .addSelect('"order"."startingRoyalties"', 'startingRoyalties')
      .addSelect('"order"."royaltiesReceiver"', 'royaltiesReceiver')
      .addSelect('"order"."startTime"', 'startTime')
      .addSelect('"order"."endTime"', 'endTime')
      .addSelect('"order"."counter"', 'counter')
      .addSelect('"order"."salt"', 'salt')
      .addSelect('"order"."zone"', 'zone')
      .addSelect('"order"."conduitKey"', 'conduitKey')
      .addSelect('"order"."protocolAddress"', 'protocolAddress')
      .addSelect('"order"."signature"', 'signature')
      .addSelect('"order"."cancelTxHash"', 'cancelTxHash')
      .addSelect('"order"."cancelLogIdx"', 'cancelLogIdx')
      .addSelect('"order"."cancelTimestamp"', 'cancelTimestamp')
      .addSelect('"order"."fulfillQuantity"', 'fulfillQuantity')
      .addSelect('"order"."remainingQuantity"', 'remainingQuantity')
      .addSelect(
        (query) =>
          query.fromDummy().select(
            `EXISTS ${query
              .subQuery()
              .from(ActiveOrderCachedEntity, 'active')
              .select('1')
              .addSelect(
                (query) =>
                  query
                    .from(OrderItemEntity, 'orders_items')
                    .select('array_agg("orders_items"."tokenId") as "tokenIds"')
                    .where('"orders_items"."hash" = "order"."hash"'),
                'tokenIds',
              )
              .where('"active"."hash" = "order"."hash"')
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .getQuery()}`,
          ),
        'active',
      )
      .addSelect(
        (query) =>
          query
            .from(OrderItemEntity, 'orders_items')
            .select('array_agg("orders_items"."tokenId") as "tokenIds"')
            .where('"orders_items"."hash" = "order"."hash"'),
        'tokenIds',
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

  @Field(() => [String])
  @ViewColumn()
  tokenIds!: string[];

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

  @Field(() => Number)
  @ViewColumn()
  marketplaceFeeBps!: number;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  marketplaceFeeReceiver!: string | null;

  @Field(() => Number)
  @ViewColumn()
  royaltiesBps!: number;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingRoyalties!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  royaltiesReceiver!: string | null;

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
  salt!: string;

  @Field(() => String)
  @ViewColumn()
  zone!: string;

  @Field(() => String)
  @ViewColumn()
  conduitKey!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  protocolAddress!: string;

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
  @Field(() => String)
  @ViewColumn()
  fulfillQuantity!: string;

  @Field(() => String)
  @ViewColumn()
  remainingQuantity!: string;
  // Cached columns

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;
}
