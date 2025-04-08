import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ItemEntity } from '.';

// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. ERC1155's TransferBatch)

@Entity({ name: 'transfers' })
@Index(['timestamp'])
@Index(['from', 'timestamp'])
@Index(['to', 'timestamp'])
@Index(['collectionAddress', 'tokenId', 'timestamp'])
@Index(
  'idx_collection_token_timestamp_desc_transfers',
  // ['collectionAddress', 'timestamp DESC', 'tokenId'],
  {
    synchronize: false,
  },
)
@Index(['collectionAddress', 'tokenId', 'timestamp'], {
  where: '"from" = \'0000000000000000000000000000000000000000\'',
})
export class TransferEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @PrimaryColumn('char', { length: 40 })
  from!: string;

  @PrimaryColumn('char', { length: 40 })
  to!: string;

  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  amount!: string;

  @Column('bool', { default: false })
  batch!: boolean;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
