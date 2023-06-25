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

@ObjectType()
@Entity({ name: 'sales' })
export class Sale extends BaseEntity {
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
  @Column('char', { length: 64 })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  orderHash!: string;

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
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  from!: string;

  @Field()
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  to!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  price!: string;

  @Field()
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
