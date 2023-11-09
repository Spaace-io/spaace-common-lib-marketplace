import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CollectionEntity } from '.';

@ObjectType()
export class ItemMedia {
  @Field(() => String)
  raw!: string;

  @Field(() => String)
  thumbnail!: string;

  @Field(() => String)
  gateway!: string;
}

@Entity({ name: 'items' })
@Index(['collectionAddress', 'tokenId'], { unique: true })
export class ItemEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Column('text', { nullable: true })
  title!: string | null;

  @Column('text', { nullable: true })
  description!: string | null;

  @Column('text', { nullable: true })
  tokenUri!: string | null;

  @Column('numeric', { precision: 2, unsigned: true, nullable: true }) // 2 digits = Maximum decimals value (77)
  decimals!: string | null;

  @Column('jsonb', { nullable: true })
  medias!: ItemMedia[] | null;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  rarityRanking!: string | null;

  @Column('float', { unsigned: true, nullable: true })
  rarityScore!: string | null;

  @Column('timestamp without time zone', { nullable: true })
  lastImport!: Date | null;
}
