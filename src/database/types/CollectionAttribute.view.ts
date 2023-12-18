import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ActiveOrderCached, ItemAttributeEntity, OrderType } from '..';

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
          .from(ActiveOrderCached, 'order')
          .select('1')
          .where(
            `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
          )
          .andWhere(
            '"order"."collectionAddress" = "attribute"."collectionAddress"',
          )
          .andWhere('"order"."tokenId" = "attribute"."tokenId"')
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
