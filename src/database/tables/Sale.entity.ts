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
import { Marketplace } from './Order.entity';

@Entity({ name: 'sales' })
@Index(['collectionAddress', 'timestamp'])
@Index(['collectionAddress', 'tokenId', 'timestamp'])
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

  @Column('char', { length: 40 })
  currency!: string;

  @Column('enum', { enum: Marketplace, enumName: 'marketplace' })
  marketplace!: Marketplace;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
