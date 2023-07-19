import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ethers } from 'ethers';
import { ValidateNested } from 'class-validator';
import { Order } from '.';
import { CollectionAttribute, CollectionAttributeValue } from '../../..';

export enum CollectionType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

registerEnumType(CollectionType, {
  name: 'CollectionType',
});

export enum CollectionLinkType {
  CUSTOM = 'custom',
  TWITTER = 'twitter',
  DISCORD = 'discord',
  INSTAGRAM = 'instagram',
  TELEGRAM = 'telegram',
  MEDIUM = 'medium',
  // WIKI, CHAT
}

registerEnumType(CollectionLinkType, {
  name: 'CollectionLinkType',
});

@ObjectType()
export class CollectionLink {
  @Field(() => CollectionLinkType)
  type!: CollectionLinkType;

  @Field(() => String)
  url!: string;
}

@ObjectType()
@Entity({ name: 'collections' })
export class Collection extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => CollectionType)
  @Column('enum', { enum: CollectionType, enumName: 'collection_type' })
  type!: CollectionType;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  symbol!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  active!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  verified!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  explicit!: boolean;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  bannerUrl!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description!: string | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  deployedAt!: Date | null;

  @Field(() => String, { nullable: true })
  @Column('char', { length: 40, nullable: true })
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  deployer!: string | null;

  @Field(() => [CollectionAttribute], { nullable: true })
  @Column('jsonb', { nullable: true })
  attributes!:
    | (Pick<CollectionAttribute, 'trait'> & {
        values: Pick<CollectionAttributeValue, 'value' | 'count'>[];
      })[]
    | null;

  @Field(() => [CollectionLink])
  @Column('jsonb', { default: [] })
  @Type(() => CollectionLink)
  @ValidateNested({ each: true })
  links!: CollectionLink[];

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
  volume1h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange1h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume6h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange6h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume24h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange24h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume7d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange7d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume30d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  volumeChange30d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  floorPrice!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  floorChange1h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  floorChange6h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  floorChange24h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  floorChange7d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  floorChange30d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount1h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount6h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount24h!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount7d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount30d!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalSupply!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  ownerCount!: string;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  lastImport!: Date | null;

  // GraphQL only fields

  @Field(() => String)
  listedCount?: string;

  @Field(() => Order, { nullable: true })
  @Type(() => Order)
  @ValidateNested()
  buyNow?: Order | null;

  @Field(() => Order, { nullable: true })
  @Type(() => Order)
  @ValidateNested()
  sellNow?: Order | null;

  @Field(() => Boolean)
  notable?: boolean;
}
