import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { SaleEntity } from '..';
import { Marketplace } from '../enums';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(SaleEntity, 'sale')
      .select('"sale"."txHash"', 'txHash')
      .addSelect('"sale"."logIdx"', 'logIdx')
      .addSelect('"sale"."orderHash"', 'orderHash')
      .addSelect('"sale"."collectionAddress"', 'collectionAddress')
      .addSelect('"sale"."tokenId"', 'tokenId')
      .addSelect('"sale"."amount"', 'amount')
      .addSelect('"sale"."from"', 'from')
      .addSelect('"sale"."to"', 'to')
      .addSelect('"sale"."price"', 'price')
      .addSelect('"sale"."currency"', 'currency')
      .addSelect('"sale"."marketplace"', 'marketplace')
      .addSelect('"sale"."timestamp"', 'timestamp');
  },
  name: 'sales_view',
})
export class Sale extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  txHash!: string;

  @Field(() => String)
  @ViewColumn()
  logIdx!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  orderHash!: string;

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
  amount!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  from!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  to!: string;

  @Field(() => String)
  @ViewColumn()
  price!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => Marketplace)
  @ViewColumn()
  marketplace!: Marketplace;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;
}
