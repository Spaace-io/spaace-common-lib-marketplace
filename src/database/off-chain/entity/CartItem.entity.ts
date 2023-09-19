import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Entity, BaseEntity, PrimaryColumn } from 'typeorm';

import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'cart_items' })
export class CartItem extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;
}
