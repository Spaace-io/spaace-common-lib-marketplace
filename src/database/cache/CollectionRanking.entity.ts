import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CollectionEntity } from '..';

@Entity({ name: 'collection_rankings_cache' })
@Index(['address'], { unique: true })
@Index(['volume'])
@Index(['volume1h'])
@Index(['volume6h'])
@Index(['volume24h'])
@Index(['volume7d'])
@Index(['volume30d'])
@Index(['volume90d'])
@Index(['volumeChange1h'])
@Index(['volumeChange6h'])
@Index(['volumeChange24h'])
@Index(['volumeChange7d'])
@Index(['volumeChange30d'])
@Index(['volumeChange90d'])
@Index(['floorPrice'])
@Index(['floorChange1h'])
@Index(['floorChange6h'])
@Index(['floorChange24h'])
@Index(['floorChange7d'])
@Index(['floorChange30d'])
@Index(['floorChange90d'])
@Index(['saleCount'])
@Index(['saleCount1h'])
@Index(['saleCount6h'])
@Index(['saleCount24h'])
@Index(['saleCount7d'])
@Index(['saleCount30d'])
@Index(['saleCount90d'])
export class CollectionRankingCached extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' }) // 78 digits = Maximum uint256 value
  volume!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume1h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume6h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume24h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume7d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume30d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  volume90d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange1h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange6h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange24h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange7d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange30d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  volumeChange90d!: string;

  @Column('numeric', { precision: 78, nullable: true })
  floorPrice!: string | null;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange1h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange6h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange24h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange7d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange30d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  floorChange90d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount1h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount6h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount24h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount7d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount30d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  saleCount90d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalSupply!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  ownerCount!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  listedCount!: string;
}
