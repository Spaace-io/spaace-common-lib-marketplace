import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { ItemAttributeEntity } from '../tables';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(ItemAttributeEntity, 'attribute')
      .select('"attribute"."collectionAddress"')
      .addSelect('"attribute"."traitHash"', 'traitHash')
      .addSelect('MIN("attribute"."trait")', 'trait')
      .addSelect('"attribute"."valueHash"', 'valueHash')
      .addSelect('MIN("attribute"."value")', 'value')
      .addSelect('COUNT(DISTINCT "attribute"."tokenId")', 'count')
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
  count!: string;
}
