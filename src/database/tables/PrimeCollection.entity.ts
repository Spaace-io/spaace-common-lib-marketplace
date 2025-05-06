import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'prime_collections' })
export class PrimeCollectionEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @Column('boolean', { default: false })
  isPrime!: boolean;

  @Column('timestamp without time zone', { nullable: true })
  updatedAt!: Date | null;
}
