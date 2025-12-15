import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'prime_collections' })
export class PrimeCollectionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Column('numrange', { nullable: true })
  tokenIdRange!: string | null;

  @Column('boolean', { default: false })
  isPrime!: boolean;

  @Column('text', { nullable: true })
  name!: string | null;

  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Column('numeric', { nullable: true })
  volume24h!: number | null;

  @Column('numeric', { nullable: true })
  volume7d!: number | null;

  @Column('numeric', { nullable: true })
  volume30d!: number | null;

  @Column('numeric', { nullable: true })
  volumeAllTime!: number | null;

  @Column('timestamp without time zone', { nullable: true })
  updatedAt!: Date | null;
}
