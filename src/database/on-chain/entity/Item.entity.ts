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
import { Collection, CollectionType, Sale } from '..';
import { Order } from '../..';

@ObjectType()
@Entity({ name: 'item_attributes' })
export class ItemAttribute extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Item)
  @JoinColumn([
    { name: 'collection', referencedColumnName: 'collection' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  collection!: string;

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
  @JoinColumn({ name: 'collection', referencedColumnName: 'address' })
  collection!: string;

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastImport?: Date;

  @Field(() => [ItemAttribute], { nullable: true })
  @OneToMany(
    () => ItemAttribute,
    (attribute) => [attribute.collection, attribute.tokenId],
  )
  attributes?: ItemAttribute[];

  // GraphQL only fields

  @Field(() => CollectionType)
  type?: CollectionType;

  @Field(() => Order, { nullable: true })
  buyNow?: Order;

  @Field(() => Order, { nullable: true })
  sellNow?: Order;

  @Field(() => Sale, { nullable: true })
  lastSale?: Sale;
}
