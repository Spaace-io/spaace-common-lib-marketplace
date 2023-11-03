import {
  BaseEntity,
  Brackets,
  DataSource,
  Index,
  JoinColumn,
  ManyToOne,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import {
  BalanceEntity,
  CollectionEntity,
  ItemEntity,
  OrderEntity,
  OrderType,
  SaleEntity,
  TokenBalanceEntity,
} from '..';
import * as utils from '../../utils';

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .leftJoin(
        (query) =>
          query
            .from(TokenBalanceEntity, 'tokenBalance')
            .select()
            .where('"tokenBalance"."balance" > 0'),
        'tokenBalance',
        '"tokenBalance"."currency" = "order"."currency" AND "tokenBalance"."userAddress" = "order"."userAddress"',
      )
      .leftJoin(
        (query) =>
          query
            .from(BalanceEntity, 'balance')
            .select()
            .where('"balance"."balance" > 0'),
        'balance',
        '"balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."userAddress" = "order"."userAddress"',
      )
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
      .where('"order"."startTime" <= NOW()')
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
            .select('1')
            .where('"sale"."orderHash" = "order"."hash"')
            .getQuery()}`,
      )
      .andWhere(
        `CASE "order"."type" WHEN '${OrderType.BID}' THEN COALESCE("tokenBalance"."balance", 0) >= "order"."price" ELSE COALESCE("balance"."balance", 0) > 0 END`,
      );
  },
  name: 'active_orders_cache',
  materialized: true,
})
@Index(['hash'], { unique: true })
@Index(['collectionAddress', 'price'], {
  where: `"type" IN ('${OrderType.ASK}', '${
    OrderType.DUTCH_AUCTION
  }') AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'price'], {
  where: `"type" = '${OrderType.BID}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'endTime'], {
  where: `"type" = '${OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'price'], {
  where: `"type" IN ('${OrderType.ASK}', '${
    OrderType.DUTCH_AUCTION
  }') AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'price'], {
  where: `"type" = '${OrderType.BID}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
@Index(['collectionAddress', 'tokenId', 'endTime'], {
  where: `"type" = '${OrderType.ENGLISH_AUCTION}' AND "currency" IN ('${utils
    .strip0x(utils.constants.ETH_TOKENS)
    .join("','")}')`,
})
export class ActiveOrderCached extends BaseEntity {
  @ViewColumn()
  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'hash', referencedColumnName: 'hash' })
  hash!: string;

  @ViewColumn()
  userAddress!: string;

  @ViewColumn()
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  collectionAddress!: string;

  @ViewColumn()
  @ManyToOne(() => ItemEntity, { nullable: true })
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

  @ViewColumn()
  type!: string;

  @ViewColumn()
  marketplace!: string;

  @ViewColumn()
  price!: string;

  @ViewColumn()
  startingPrice!: string;

  @ViewColumn()
  currency!: string;

  @ViewColumn()
  startTime!: string;

  @ViewColumn()
  endTime!: string;

  @ViewColumn()
  counter!: string;

  @ViewColumn()
  signature!: string;

  @ViewColumn()
  cancelTxHash!: string;

  @ViewColumn()
  cancelLogIdx!: string;

  @ViewColumn()
  cancelTimestamp!: string;

  @ViewColumn()
  royalties!: string;

  @ViewColumn()
  startingRoyalties!: string;
}
