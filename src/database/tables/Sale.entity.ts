import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ItemEntity } from './Item.entity';
import { Marketplace } from '../enums';

@Entity({ name: 'sales' })
@Index(['timestamp'])
@Index(['from', 'timestamp'])
@Index(['to', 'timestamp'])
@Index(['collectionAddress', 'timestamp'])
@Index(['collectionAddress', 'perUnitPrice'])
@Index(
  'sales_h_timestamp_idx',
  // ['timestamp DESC'],
  {
    synchronize: false,
  },
)
@Index(['collectionAddress'])
@Index(
  'IDX_f7931cf6fcf04f0899ff8a2405',
  // ['collectionAddress', 'tokenId', 'timestamp DESC'],
  {
    synchronize: false,
  },
)
@Index(['orderHash'])
export class SaleEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

  @Column('char', { length: 64 })
  orderHash!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  amount!: string;

  @Column('char', { length: 40 })
  from!: string;

  @Column('char', { length: 40 })
  to!: string;

  @Column('numeric', { precision: 78, unsigned: true })
  price!: string;

  // @Column('numeric', { precision: 78, unsigned: true })
  // wethPrice!: string;

  @Column('numeric', { precision: 78, unsigned: true })
  perUnitPrice!: string;

  // @Column('numeric', { precision: 78, unsigned: true })
  // wethPerUnitPrice!: string;

  @Column('char', { length: 40 })
  currency!: string;

  @Column('enum', { enum: Marketplace, enumName: 'marketplace' })
  marketplace!: Marketplace;

  @PrimaryColumn('timestamp without time zone')
  timestamp!: Date;
}
