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

@Entity({ name: 'balances' })
@Index(['collectionAddress', 'tokenId', 'balance'], { where: '"balance" > 0' })
@Index(['balance', 'collectionAddress'])
@Index(['collectionAddress', 'userAddress'], {
  where: '"balance" > 0',
})
@Index(['userAddress', 'collectionAddress', 'tokenId'], {
  where: '"balance" > 0',
  unique: true,
})
export class BalanceEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78, default: '0' })
  balance!: string;
}
