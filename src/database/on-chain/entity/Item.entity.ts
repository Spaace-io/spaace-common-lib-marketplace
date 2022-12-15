import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from './Collection.entity';

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

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => Collection)
  @ManyToOne(() => Collection, (collection) => collection.items, { eager: true })
  collection!: Collection;

  @Field()
  @Column({ nullable: true })
  title!: string;

  @Field()
  @Column({ nullable: true })
  description!: string;

  @Field()
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field()
  @Column({ nullable: true, unique: true })
  primaryId!: string;

  @Field()
  @Column({ default: false })
  isRefreshed!: boolean;

  @Field()
  @Column({ nullable: true })
  lastTimeUpdate!: Date;

  @Field()
  @Column({ nullable: true })
  tokenUri!: string;

  @Field(() => [ItemAttribute])
  @Column('jsonb', { nullable: true })
  attributes!: object[];

  @Field(() => [ItemMedia])
  @Column('jsonb', { nullable: true })
  medias!: object[];

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  created_at!: Date;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updated_at!: Date;

  // @Field()
  // @Column({ nullable: true })
  // owner!: string[];

}
