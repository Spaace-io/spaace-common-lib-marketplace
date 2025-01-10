import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum CollectionType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

registerEnumType(CollectionType, {
  name: 'CollectionType',
});

export enum CollectionLinkType {
  CUSTOM = 'CUSTOM',
  TWITTER = 'TWITTER',
  DISCORD = 'DISCORD',
  INSTAGRAM = 'INSTAGRAM',
  TELEGRAM = 'TELEGRAM',
  MEDIUM = 'MEDIUM',
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

@Entity({ name: 'collections' })
export class CollectionEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  address!: string;

  @Column('enum', { enum: CollectionType, enumName: 'collection_type' })
  type!: CollectionType;

  @Column('text', { nullable: true })
  name!: string | null;

  @Column('text', { nullable: true })
  symbol!: string | null;

  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Column('boolean', { default: true })
  active!: boolean;

  @Column('boolean', { default: false })
  verified!: boolean;

  @Column('boolean', { default: false })
  explicit!: boolean;

  @Column('text', { nullable: true })
  bannerUrl!: string | null;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column('timestamp without time zone', { nullable: true })
  deployedAt!: Date | null;

  @Column('char', { length: 40, nullable: true })
  deployer!: string | null;

  @Column('jsonb', { default: [] })
  links!: CollectionLink[];

  @Column('timestamp without time zone', { nullable: true })
  lastImport!: Date | null;

  @Field(() => Boolean, { defaultValue: false })
  @Column('boolean', { default: false })
  prime: boolean;
}
