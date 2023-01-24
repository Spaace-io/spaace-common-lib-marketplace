import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Order } from '../..';

export enum CollectionType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

registerEnumType(CollectionType, {
  name: 'CollectionType',
});

@ObjectType()
export class CollectionAttribute {
  @Field()
  trait!: string;

  @Field()
  value!: string;

  @Field()
  count!: string;
}

@ObjectType()
@Entity({ name: 'collections' })
export class Collection extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  address!: string;

  @Field(() => CollectionType)
  @Column('enum', { enum: CollectionType, enumName: 'collection_type' })
  type!: CollectionType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  symbol?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imageUrl?: string;

  @Field()
  @Column({ default: true })
  active!: boolean;

  @Field()
  @Column({ default: false })
  verified!: boolean;

  @Field()
  @Column({ default: false })
  explicit!: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  deployedAt?: Date;

  @Field({ nullable: true })
  @Column('char', { length: 40, nullable: true })
  deployer?: string;

  @Field(() => [CollectionAttribute], { nullable: true })
  @Column('jsonb', { nullable: true })
  attributes?: CollectionAttribute[];

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
  volume24h!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange24h!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume7d!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange7d!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume30d!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange30d!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume!: string;

  @Field({ nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  floorPrice?: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  floorChange24h!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  floorChange7d!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  floorChange30d!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  totalSupply!: string;

  @Field()
  @Column('numeric', { precision: 78, default: '0' })
  ownerCount!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastImport?: Date;

  // Database only fields

  @Column({ default: false })
  importItems!: boolean;

  // GraphQL only fields

  @Field(() => Order, { nullable: true })
  buyNow?: Order;

  @Field(() => Order, { nullable: true })
  sellNow?: Order;
}
