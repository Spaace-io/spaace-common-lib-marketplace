import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Collection, CollectionType } from '..';
import { Order } from '../..';

@ObjectType()
export class ItemAttribute {
  @Field()
  trait!: string;

  @Field()
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

  @Field(() => [ItemAttribute], { nullable: true })
  @Column('jsonb', { nullable: true })
  attributes?: ItemAttribute[];

  @Field(() => [ItemMedia], { nullable: true })
  @Column('jsonb', { nullable: true })
  medias?: ItemMedia[];

  @Field({ nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  rarityRanking?: string;

  @Field({ nullable: true })
  @Column('numeric', { precision: 19, unsigned: true, nullable: true })
  rarityScore?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastImport?: Date;

  // GraphQL only fields

  @Field(() => CollectionType)
  type?: CollectionType;

  @Field(() => Order, { nullable: true })
  buyNow?: Order;

  @Field(() => Order, { nullable: true })
  sellNow?: Order;
}
