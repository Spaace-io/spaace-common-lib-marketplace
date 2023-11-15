import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ItemMediaEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(ItemMediaEntity, 'media')
      .select('"media"."id"', 'id')
      .addSelect('"media"."collectionAddress"', 'collectionAddress')
      .addSelect('"media"."tokenId"', 'tokenId')
      .addSelect('"media"."primary"', 'primary')
      .addSelect('"media"."raw"', 'raw');
  },
  name: 'item_medias_view',
})
export class ItemMedia extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  id!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

  @Field(() => Boolean)
  @ViewColumn()
  primary!: boolean;

  // Nullable only on GraphQL in case it's a data URI
  @Field(() => String, { nullable: true })
  @ViewColumn()
  raw!: string;
}
