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
import { Collection, ItemAttribute, Order, Sale } from '.';
import { Transform, Type } from 'class-transformer';
import { ethers } from 'ethers';
import { ValidateNested } from 'class-validator';

@ObjectType()
export class ItemMedia {
  @Field(() => String)
  raw!: string;

  @Field(() => String)
  thumbnail!: string;

  @Field(() => String)
  gateway!: string;
}

@ObjectType()
@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Collection)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  tokenUri!: string | null;

  @Field(() => [ItemMedia], { nullable: true })
  @Column('jsonb', { nullable: true })
  @Type(() => ItemMedia)
  @ValidateNested({ each: true })
  medias!: ItemMedia[] | null;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  rarityRanking!: string | null;

  @Field(() => String, { nullable: true })
  @Column('float', { unsigned: true, nullable: true })
  rarityScore!: string | null;

  @Field(() => [ItemAttribute], { nullable: true })
  @OneToMany(
    () => ItemAttribute,
    (attribute) => [attribute.collectionAddress, attribute.tokenId],
  )
  @Type(() => ItemAttribute)
  @ValidateNested({ each: true })
  attributes!: ItemAttribute[] | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  lastImport!: Date | null;

  // GraphQL only fields

  @Field(() => Collection)
  @Type(() => Collection)
  @ValidateNested()
  collection?: Collection;

  @Field(() => String)
  ownerCount?: string;

  @Field(() => Order, { nullable: true })
  @Type(() => Order)
  @ValidateNested()
  buyNow?: Order | null;

  @Field(() => Order, { nullable: true })
  @Type(() => Order)
  @ValidateNested()
  sellNow?: Order | null;

  @Field(() => Order, { nullable: true })
  @Type(() => Order)
  @ValidateNested()
  auction?: Order | null;

  @Field(() => Sale, { nullable: true })
  @Type(() => Sale)
  @ValidateNested()
  lastSale?: Sale | null;
}
