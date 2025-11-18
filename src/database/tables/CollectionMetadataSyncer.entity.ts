import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column, Index } from 'typeorm';

@ObjectType()
@Entity({ name: 'collection_metadata_syncer' })
@Index(['proceed'])
@Index(['visited'])
export class CollectionMetadataSyncer extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  address!: string;

  @Field(() => Number)
  @Column('float', { default: 0 })
  visited!: number;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  proceed!: boolean;
}
