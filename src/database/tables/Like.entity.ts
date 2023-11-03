import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { BigNumber, ethers } from 'ethers';
import { ItemEntity } from './Item.entity';
import { CollectionEntity } from './Collection.entity';
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'likes' })
@Index(['userAddress', 'collectionAddress', 'tokenId'], { unique: true })
export class Like extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ItemEntity, { nullable: true })
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  @Transform(
    ({ value }) =>
      value === BigNumber.from(2).pow(256).toString() ? null : value,
    {
      toPlainOnly: true,
    },
  )
  tokenId!: string;
}
