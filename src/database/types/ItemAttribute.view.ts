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
      .select('"attribute"."collectionAddress"', 'collectionAddress')
      .addSelect('"attribute"."tokenId"', 'tokenId')
      .addSelect('"attribute"."traitHash"', 'traitHash')
      .addSelect('"attribute"."trait"', 'trait')
      .addSelect('"attribute"."valueHash"', 'valueHash')
      .addSelect('"attribute"."value"', 'value');
  },
  name: 'item_attributes_view',
})
export class ItemAttribute extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

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
}
