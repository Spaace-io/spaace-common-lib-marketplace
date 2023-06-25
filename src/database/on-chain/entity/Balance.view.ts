import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
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
            .addSelect('"to"', 'user')
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
            .addSelect('"from"', 'user')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"collectionAddress"')
            .addGroupBy('"tokenId"')
            .addGroupBy('"from"'),
        'sent',
        '"sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user"',
      )
      .select('"received"."collectionAddress"')
      .addSelect('"received"."tokenId"')
      .addSelect('"received"."user"')
      .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
      .where('"received"."total" > COALESCE("sent"."total", 0)')
      .andWhere(
        `"received"."user" <> '${utils.strip0x(ethers.constants.AddressZero)}'`,
      );
  },
  name: 'balances',
})
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
  user!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;

  // GraphQL only fields

  @Field(() => Item)
  @Type(() => Item)
  @ValidateNested()
  item?: Item;
}
