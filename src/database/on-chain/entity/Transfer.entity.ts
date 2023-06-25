import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Item } from './Item.entity';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)

@ObjectType()
@Entity({ name: 'transfers' })
export class Transfer extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 64 })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  txHash!: string;

  @Field()
  @PrimaryColumn()
  logIdx!: number;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  from!: string;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  to!: string;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Item)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field()
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  amount!: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
