import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ItemAttributeEntity } from '..';

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
      .addSelect('COUNT(DISTINCT "attribute"."tokenId")', 'itemCount')
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
}
