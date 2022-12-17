import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Collection } from './Collection.entity';
import { Event } from '../../..';

@ObjectType()
export class ItemAttribute {

  @Field()
  trait!: string;

  @Field()
  type!: string;

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

  @Field(() => Collection)
  @PrimaryColumn(String)
  @ManyToOne(() => Collection, (collection) => collection.items, { eager: true })
  @JoinColumn({ name: 'collection' })
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

  @Field(() => [ItemAttribute], { defaultValue: [] })
  @Column('jsonb', { nullable: true })
  attributes?: object[];

  @Field(() => [ItemMedia], { defaultValue: [] })
  @Column('jsonb', { nullable: true })
  medias?: object[];

  // GraphQL only fields

  @Field(() => [Event], { nullable: true })
  events?: typeof Event[];

}
