import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { TransferEntity } from '..';

// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. ERC1155's TransferBatch)

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(TransferEntity, 'transfer')
      .select('"transfer"."txHash"', 'txHash')
      .addSelect('"transfer"."logIdx"', 'logIdx')
      .addSelect('"transfer"."from"', 'from')
      .addSelect('"transfer"."to"', 'to')
      .addSelect('"transfer"."collectionAddress"', 'collectionAddress')
      .addSelect('"transfer"."tokenId"', 'tokenId')
      .addSelect('"transfer"."amount"', 'amount')
      .addSelect('"transfer"."timestamp"', 'timestamp');
  },
  name: 'transfers_view',
})
export class Transfer extends BaseEntity {
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

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;
}
