import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'user_royalty_collections' })
export class UserRoyaltyCollection extends BaseEntity {
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

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamptz' })
  firstPaidAt!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalRoyaltyWei!: string;
}
