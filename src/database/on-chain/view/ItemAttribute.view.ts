import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { ItemAttributeEntity } from '../entity';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(ItemAttributeEntity, 'attribute')
      .select('"attribute".*');
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

  @Field(() => String)
  @ViewColumn()
  trait!: string;

  @Field(() => String)
  @ViewColumn()
  value!: string;
}
