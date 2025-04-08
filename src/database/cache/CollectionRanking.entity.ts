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
  previousVolume1h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  previousVolume6h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  previousVolume24h!: string;

  @Column('numeric', { precision: 78, default: '0' })
  previousVolume7d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  previousVolume30d!: string;

  @Column('numeric', { precision: 78, default: '0' })
  previousVolume90d!: string;

  @Column('numeric', { precision: 78, nullable: true })
  floorPrice!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice1h!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice6h!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice24h!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice7d!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice30d!: string | null;

  @Column('numeric', { precision: 78, nullable: true })
  previousFloorPrice90d!: string | null;

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
  previousSaleCount1h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  previousSaleCount6h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  previousSaleCount24h!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  previousSaleCount7d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  previousSaleCount30d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  previousSaleCount90d!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalSupply!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  ownerCount!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  listedCount!: string;
}
