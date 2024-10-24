import {
  BaseEntity,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ItemEntity, CollectionEntity, OrderEntity } from '.';

@Entity({ name: 'orders_items' })
@Index(['hash'])
@Index(['hash', 'collectionAddress'])
@Index(['hash', 'collectionAddress', 'tokenId'])
export class OrderItemEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  hash!: string;

  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string | null;

  @ManyToOne(() => OrderEntity, (order) => order.tokens, {
    onDelete: 'CASCADE',
  })
  order!: OrderEntity;

  @ManyToOne(() => ItemEntity, (itemEntity) => itemEntity.tokenId, {
    onDelete: 'CASCADE',
  })
  itemEntity!: ItemEntity;
}
