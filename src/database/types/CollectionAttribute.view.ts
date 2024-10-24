import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ActiveOrderCachedEntity, ItemAttributeEntity } from '..';
import { OrderType } from '../enums';
import { OrderItemEntity } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    const query = dataSource.createQueryBuilder();
    return query
      .from(ItemAttributeEntity, 'attribute')
      .select('"attribute"."collectionAddress"')
      .addSelect('"attribute"."traitHash"', 'traitHash')
      .addSelect('MIN("attribute"."trait")', 'trait')
      .addSelect('"attribute"."valueHash"', 'valueHash')
      .addSelect('MIN("attribute"."value")', 'value')
      .addSelect('COUNT(*)', 'itemCount')
      .addSelect(
        `SUM(CASE WHEN EXISTS ${query
          .subQuery()
          .from(ActiveOrderCachedEntity, 'order')
          .select('"order".*')
          .innerJoin(
            (q) =>
              q
                .from(OrderItemEntity, 'orders_items')
                .select([
                  '"orders_items"."hash"',
                  'array_agg("orders_items"."tokenId") as "tokenIds"',
                ])
                .groupBy('"orders_items"."hash"')
                .having(
                  '"attribute"."tokenId" = ANY (array_agg("orders_items"."tokenId"))',
                ),
            'orders_items',
            '"orders_items"."hash" = "order"."hash"',
          )
          .where(
            `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
          )
          .andWhere(
            '"order"."collectionAddress" = "attribute"."collectionAddress"',
          )
          .getQuery()} THEN 1 ELSE 0 END)`,
        'listedCount',
      )
      .groupBy('"attribute"."collectionAddress"')
      .addGroupBy('"attribute"."traitHash"')
      .addGroupBy('"attribute"."valueHash"');
  },
  name: 'collection_attributes_view',
})
export class CollectionAttribute extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @ViewColumn()
  traitHash!: string;

  @Field(() => String)
  @ViewColumn()
  trait!: string;

  @ViewColumn()
  valueHash!: string;

  @Field(() => String)
  @ViewColumn()
  value!: string;

  @Field(() => String)
  @ViewColumn()
  itemCount!: string;

  @Field(() => String)
  @ViewColumn()
  listedCount!: string;
}
