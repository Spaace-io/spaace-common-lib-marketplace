import { Field, ObjectType } from '@nestjs/graphql';
import { BigNumber, ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { CollectionEntity, ItemEntity, LikeEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return (
      dataSource
        .createQueryBuilder()
        .from(LikeEntity, 'like')

        .select('"like"."id"', 'id')
        .addSelect('"like"."userAddress"', 'userAddress')
        .addSelect('"like"."collectionAddress"', 'collectionAddress')
        .addSelect('"like"."tokenId"', 'tokenId')

        // Used for searching in collection fields
        .addSelect(
          (q) =>
            q
              .from(CollectionEntity, 'collection')
              .select('"collection"."description"')
              .where('"collection"."address" = "like"."collectionAddress"'),
          'description',
        )
        .addSelect(
          (q) =>
            q
              .from(CollectionEntity, 'collection')
              .select('"collection"."name"')
              .where('"collection"."address" = "like"."collectionAddress"'),
          'name',
        )

        // Used for searching in item fields
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."title"')
              .where('"item"."collectionAddress" = "like"."collectionAddress"')
              .andWhere('"item"."tokenId" = "like"."tokenId"'),
          'title',
        )
    );
  },
  name: 'likes_view',
})
export class Like extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  id!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) =>
      value === BigNumber.from(2).pow(256).toString() ? null : value,
    {
      toPlainOnly: true,
    },
  )
  tokenId!: string;
}
