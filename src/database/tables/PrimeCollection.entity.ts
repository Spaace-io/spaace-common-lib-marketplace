import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'prime_collections' })
export class PrimeCollectionEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @Column('boolean', { default: false })
  isPrime!: boolean;

  @Column('text', { nullable: true })
  name!: string | null;

  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Column('timestamp without time zone', { nullable: true })
  updatedAt!: Date | null;
}
