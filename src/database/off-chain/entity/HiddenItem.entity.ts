import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ethers } from 'ethers';
import { ValidateNested } from 'class-validator';
import { User } from '.';
import { Item } from '../..';

@ObjectType()
@Entity({ name: 'hidden_items' })
export class HiddenItem extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
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
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  tokenId!: string;

  // GraphQL only fields

  @Field(() => Item)
  @Type(() => Item)
  @ValidateNested()
  item?: Item;
}
