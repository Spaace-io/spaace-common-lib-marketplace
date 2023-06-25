import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Item } from '../../on-chain';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 64 })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  hash!: string;

  @Field()
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  user!: string;

  @Field()
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tokenId?: string;

  @Field()
  @Column()
  isAsk!: boolean;

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
  @Column()
  startTime!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endTime?: Date;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  counter!: string;

  @Field()
  @Column()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  // GraphQL only fields

  @Field(() => Item)
  item?: Item;
}
