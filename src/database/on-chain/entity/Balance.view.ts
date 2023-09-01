import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, Index, ViewColumn, ViewEntity } from 'typeorm';
import { Item, Transfer } from '.';
import { utils } from '../../..';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ObjectType()
@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (query) =>
          query
            .from(Transfer, 'transfer')
            .select('"collectionAddress"')
            .addSelect('"tokenId"')
            .addSelect('"to"', 'userAddress')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"collectionAddress"')
            .addGroupBy('"tokenId"')
            .addGroupBy('"to"'),
        'received',
      )
      .leftJoin(
        (query) =>
          query
            .from(Transfer, 'transfer')
            .select('"collectionAddress"')
            .addSelect('"tokenId"')
            .addSelect('"from"', 'userAddress')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"collectionAddress"')
            .addGroupBy('"tokenId"')
            .addGroupBy('"from"'),
        'sent',
        '"sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress"',
      )
      .select('"received"."collectionAddress"')
      .addSelect('"received"."tokenId"')
      .addSelect('"received"."userAddress"')
      .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
      .where('"received"."total" > COALESCE("sent"."total", 0)')
      .andWhere(
        `"received"."userAddress" <> '${utils.strip0x(
          ethers.constants.AddressZero,
        )}'`,
      );
  },
  name: 'balances',
})
@Index(['userAddress', 'collectionAddress', 'tokenId']) // User portfolio
@Index(['collectionAddress', 'tokenId']) // Owner count
export class Balance extends BaseEntity {
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
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;

  // GraphQL only fields

  @Field(() => Item)
  @Type(() => Item)
  @ValidateNested()
  item?: Item;
}
