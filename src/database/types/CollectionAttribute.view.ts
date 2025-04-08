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
      .addSelect((qb) => {
        return qb
          .select('COALESCE(COUNT(DISTINCT order.hash), 0)')
          .from(ActiveOrderCachedEntity, 'order')
          .whereExists(
            qb
              .subQuery()
              .select('1')
              .from(OrderItemEntity, 'orders_items')
              .where('orders_items.tokenId = ANY(array_agg(attribute.tokenId))')
              .andWhere('orders_items.hash = order.hash')
              .andWhere(
                'orders_items.collectionAddress = attribute.collectionAddress',
              ),
          )
          .andWhere(
            `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
          )
          .andWhere('"order"."endTime" > NOW()')
          .andWhere('"order"."startTime" <= NOW()')
          .andWhere('order.collectionAddress = attribute.collectionAddress');
      }, 'listedCount')
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
