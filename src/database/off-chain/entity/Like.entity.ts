import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { BigNumber, ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'likes' })
@Unique(['userAddress', 'collectionAddress', 'tokenId'])
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @Transform(
    ({ value }) =>
      value === BigNumber.from(2).pow(256).toString() ? null : value,
    {
      toPlainOnly: true,
    },
  )
  tokenId!: string;
}
