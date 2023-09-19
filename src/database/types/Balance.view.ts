import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { TransferEntity } from '../tables';
import { utils } from '../..';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (query) =>
          query
            .from(TransferEntity, 'transfer')
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
            .from(TransferEntity, 'transfer')
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
  name: 'balances_view',
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
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;
}
