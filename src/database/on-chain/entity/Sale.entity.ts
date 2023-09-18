import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ItemEntity } from './Item.entity';

@Entity({ name: 'sales' })
export class SaleEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  logIdx!: string;

  @Column('char', { length: 64 })
  orderHash!: string;

  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

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

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
