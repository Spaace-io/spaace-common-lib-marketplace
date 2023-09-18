import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { OrderEntity, OrderType } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(OrderEntity, 'order')
      .select('"order".*');
  },
  name: 'orders_view',
})
export class Order extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  hash!: string;

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
  tokenId!: string | null;

  @Field(() => OrderType)
  @ViewColumn()
  type!: OrderType;

  @Field(() => String)
  @ViewColumn()
  price!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  startingPrice!: string | null;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => Date)
  @ViewColumn()
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  endTime!: Date | null;

  @Field(() => String)
  @ViewColumn()
  counter!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) =>
      value !== null
        ? ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null,
    {
      toPlainOnly: true,
    },
  )
  cancelTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  cancelLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  cancelTimestamp!: Date | null;

  // TODO: active
}
