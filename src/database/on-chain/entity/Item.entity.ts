import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Balance, Collection, CollectionType, Sale } from '..';
import { Order } from '../..';

@ObjectType()
@Entity({ name: 'item_attributes' })
export class ItemAttribute extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Item)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  collectionAddress!: string;

  @Field()
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field()
  @PrimaryColumn('text')
  trait!: string;

  @Field()
  @Column('text')
  value!: string;
}

@ObjectType()
export class ItemMedia {
  @Field()
  raw!: string;

  @Field()
  thumbnail!: string;

  @Field()
  gateway!: string;
}

@ObjectType()
@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Collection)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  collectionAddress!: string;

  @Field(() => Collection)
  collection!: Collection;

  @Field()
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  tokenUri?: string;

  @Field(() => [ItemMedia], { nullable: true })
  @Column('jsonb', { nullable: true })
  medias?: ItemMedia[];

  @Field({ nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  rarityRanking?: string;

  @Field({ nullable: true })
  @Column('float', { unsigned: true, nullable: true })
  rarityScore?: string;

  @Field(() => [ItemAttribute], { nullable: true })
  @OneToMany(
    () => ItemAttribute,
    (attribute) => [attribute.collectionAddress, attribute.tokenId],
  )
  attributes?: ItemAttribute[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastImport?: Date;

  // GraphQL only fields

  @Field(() => CollectionType)
  type!: CollectionType;

  @Field(() => Order, { nullable: true })
  buyNow?: Order;

  @Field(() => Order, { nullable: true })
  sellNow?: Order;

  @Field(() => Sale, { nullable: true })
  lastSale?: Sale;

  @Field()
  ownerCount!: string;

  @Field(() => [Balance], { nullable: true })
  owners!: Balance[];
}
