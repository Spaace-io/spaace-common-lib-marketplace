import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Collection } from '..';
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
  @PrimaryColumn()
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

  @Field(() => [ItemAttribute], { defaultValue: [] })
  @Column('jsonb', { nullable: true })
  attributes?: ItemAttribute[];

  @Field(() => [ItemMedia], { defaultValue: [] })
  @Column('jsonb', { nullable: true })
  medias?: ItemMedia[];

  // GraphQL only fields

  @Field(() => Order, { nullable: true })
  buyNow?: Order;

  @Field(() => Order, { nullable: true })
  sellNow?: Order;

}
