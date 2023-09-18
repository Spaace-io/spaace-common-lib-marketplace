import {
  BaseEntity,
  Brackets,
  DataSource,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import {
  Balance,
  CollectionEntity,
  CollectionLink,
  CollectionType,
  CollectionVolume,
  ItemAttributeEntity,
  OrderEntity,
  OrderType,
  SaleEntity,
} from '..';
import { CollectionAttribute } from '../../../graphql';
import { utils } from '../../..';
import { ethers } from 'ethers';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

function getSaleCountQuery(interval: string) {
  return (query: SelectQueryBuilder<object>) =>
    query
      .from(SaleEntity, 'sale')
      .select('COUNT(*)')
      .where('"sale"."collectionAddress" = "collection"."address"')
      .andWhere(
        `"sale"."currency" IN ('${utils.strip0x(
          ethers.constants.AddressZero,
        )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
      )
      .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return (
      dataSource
        .createQueryBuilder()
        .from(CollectionEntity, 'collection')
        .innerJoin(
          CollectionVolume,
          'volume',
          '"volume"."address" = "collection"."address"',
        )
        .select('"collection".*')
        .addSelect('"volume"."volume1h"')
        .addSelect('"volume"."volumeChange1h"')
        .addSelect('"volume"."volume6h"')
        .addSelect('"volume"."volumeChange6h"')
        .addSelect('"volume"."volume24h"')
        .addSelect('"volume"."volumeChange24h"')
        .addSelect('"volume"."volume7d"')
        .addSelect('"volume"."volumeChange7d"')
        .addSelect('"volume"."volume30d"')
        .addSelect('"volume"."volumeChange30d"')
        .addSelect('"volume"."volume"')
        .addSelect(
          (query) =>
            query.fromDummy().select(
              `array_to_json(ARRAY ${query
                .subQuery()
                .from(ItemAttributeEntity, 'attribute')
                .select(
                  `json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'values', array_to_json(ARRAY ${query
                    .subQuery()
                    .from(ItemAttributeEntity, 'value')
                    .select(
                      `json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'value', "value"."value", 'count', COUNT(DISTINCT "value"."tokenId"))`,
                    )
                    .where(
                      '"value"."collectionAddress" = "collection"."address"',
                    )
                    .andWhere('"value"."trait" = "attribute"."trait"')
                    .groupBy('"value"."value"')
                    .getQuery()}))`,
                )
                .where(
                  '"attribute"."collectionAddress" = "collection"."address"',
                )
                .groupBy('"attribute"."trait"')
                .getQuery()})`,
            ),
          'attributes',
        )
        // TODO: floorChange1h
        // TODO: floorChange6h
        // TODO: floorChange24h
        // TODO: floorChange7d
        // TODO: floorChange30d
        .addSelect(getSaleCountQuery('1 hour'), 'saleCount1h')
        .addSelect(getSaleCountQuery('6 hours'), 'saleCount6h')
        .addSelect(getSaleCountQuery('1 day'), 'saleCount24h')
        .addSelect(getSaleCountQuery('7 days'), 'saleCount7d')
        .addSelect(getSaleCountQuery('30 days'), 'saleCount30d')
        .addSelect(
          (query) =>
            query
              .from(SaleEntity, 'sale')
              .select('COUNT(*)')
              .where('"sale"."collectionAddress" = "collection"."address"')
              .andWhere(
                `"sale"."currency" IN ('${utils.strip0x(
                  ethers.constants.AddressZero,
                )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
              ),
          'saleCount',
        )
        .addSelect(
          (query) =>
            query
              .from(Balance, 'balance')
              .select('SUM("balance"."balance")')
              .where('"balance"."collectionAddress" = "collection"."address"'),
          'totalSupply',
        )
        .addSelect(
          (query) =>
            query
              .from(Balance, 'balance')
              .select('COUNT(DISTINCT "balance"."userAddress")')
              .where('"balance"."collectionAddress" = "collection"."address"'),
          'ownerCount',
        )
        .addSelect(
          (query) =>
            query
              .from(OrderEntity, 'order')
              .select('COUNT(DISTINCT "order"."tokenId")')
              .where(
                `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}', '${OrderType.ENGLISH_AUCTION}')`,
              )
              .andWhere('"order"."collectionAddress" = "collection"."address"')
              .andWhere('"order"."startTime" <= NOW()')
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .andWhere('"order"."cancelTimestamp" IS NULL')
              .andWhere(
                (query) =>
                  `NOT EXISTS ${query
                    .subQuery()
                    .from(SaleEntity, 'sale')
                    .where('"sale"."orderHash" = "order"."hash"')
                    .getQuery()}`,
              )
              .andWhere(
                `"order"."currency" IN ('${utils.strip0x(
                  ethers.constants.AddressZero,
                )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
              )
              .andWhere(
                (query) =>
                  `${query
                    .subQuery()
                    .select('"balance"."balance"')
                    .from(Balance, 'balance')
                    .where('"balance"."userAddress" = "order"."userAddress"')
                    .andWhere(
                      '"balance"."collectionAddress" = "order"."collectionAddress"',
                    )
                    .andWhere('"balance"."tokenId" = "order"."tokenId"')
                    .getQuery()} > 0`,
              ),
          'listedCount',
        )
    );
  },
  name: 'collections_view',
})
export class Collection extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => CollectionType)
  @ViewColumn()
  type!: CollectionType;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  name!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  symbol!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  imageUrl!: string | null;

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  verified!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  explicit!: boolean;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  bannerUrl!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  description!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  deployedAt!: Date | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  deployer!: string | null;

  @Field(() => [CollectionLink])
  @ViewColumn()
  @Type(() => CollectionLink)
  @ValidateNested({ each: true })
  links!: CollectionLink[];

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  lastImport!: Date | null;

  // Computed columns

  @Field(() => [CollectionAttribute], { nullable: true })
  @ViewColumn()
  attributes!: CollectionAttribute[] | null;

  @Field(() => String)
  @ViewColumn()
  volume1h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  volume6h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  volume24h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  volume7d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  volume30d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  volume!: string;

  @Field(() => String)
  // @ViewColumn()
  floorChange1h!: string;

  @Field(() => String)
  // @ViewColumn()
  floorChange6h!: string;

  @Field(() => String)
  // @ViewColumn()
  floorChange24h!: string;

  @Field(() => String)
  // @ViewColumn()
  floorChange7d!: string;

  @Field(() => String)
  // @ViewColumn()
  floorChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount1h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount6h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount24h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount7d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount30d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount!: string;

  @Field(() => String)
  @ViewColumn()
  totalSupply!: string;

  @Field(() => String)
  @ViewColumn()
  ownerCount!: string;

  @Field(() => String)
  @ViewColumn()
  listedCount!: string;
}
