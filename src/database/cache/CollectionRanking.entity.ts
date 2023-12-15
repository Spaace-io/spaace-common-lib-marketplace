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
@Index(['previousVolume1h'])
@Index(['previousVolume6h'])
@Index(['previousVolume24h'])
@Index(['previousVolume7d'])
@Index(['previousVolume30d'])
@Index(['previousVolume90d'])
// @Index(() => ['"volume1h" - "previousVolume1h"'])
// @Index(() => ['"volume6h" - "previousVolume6h"'])
// @Index(() => ['"volume24h" - "previousVolume24h"'])
// @Index(() => ['"volume7d" - "previousVolume7d"'])
// @Index(() => ['"volume30d" - "previousVolume30d"'])
// @Index(() => ['"volume90d" - "previousVolume90d"'])
@Index(['floorPrice'])
@Index(['previousFloorPrice1h'])
@Index(['previousFloorPrice6h'])
@Index(['previousFloorPrice24h'])
@Index(['previousFloorPrice7d'])
@Index(['previousFloorPrice30d'])
@Index(['previousFloorPrice90d'])
// @Index(() => ['"floorPrice" - "previousFloorPrice1h"'])
// @Index(() => ['"floorPrice" - "previousFloorPrice6h"'])
// @Index(() => ['"floorPrice" - "previousFloorPrice24h"'])
// @Index(() => ['"floorPrice" - "previousFloorPrice7d"'])
// @Index(() => ['"floorPrice" - "previousFloorPrice30d"'])
// @Index(() => ['"floorPrice" - "previousFloorPrice90d"'])
@Index(['saleCount'])
@Index(['saleCount1h'])
@Index(['saleCount6h'])
@Index(['saleCount24h'])
@Index(['saleCount7d'])
@Index(['saleCount30d'])
@Index(['saleCount90d'])
@Index(['previousSaleCount1h'])
@Index(['previousSaleCount6h'])
@Index(['previousSaleCount24h'])
@Index(['previousSaleCount7d'])
@Index(['previousSaleCount30d'])
@Index(['previousSaleCount90d'])
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
