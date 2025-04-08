import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { OrderItemEntity, CollectionEntity } from '.';
import { Marketplace, OrderType } from '../enums';

@Entity({ name: 'orders' })
@Index(['collectionAddress', 'startTime']) // Collection analytics & activity
@Index(['userAddress', 'collectionAddress'])
@Index(['userAddress', 'counter'])
@Index(
  'orders_endTime_idx',
  // ['endTime DESC'],
  {
    synchronize: false,
  },
)
export class OrderEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  hash!: string;

  @Column('char', { length: 40 })
  // No foreign key to the User entity because of aggregation of other marketplaces
  userAddress!: string;

  @Column('char', { length: 40 })
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'collectionAddress', referencedColumnName: 'address' })
  collectionAddress!: string;

  @Column('enum', { enum: OrderType, enumName: 'order_type' })
  type!: OrderType;

  @Column('enum', { enum: Marketplace, enumName: 'marketplace' })
  marketplace!: Marketplace;

  @Column('numeric', { precision: 78, unsigned: true })
  price!: string;

  @Column('numeric', { precision: 78, unsigned: true })
  perUnitPrice!: string;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  startingPrice!: string | null;

  @Column('char', { length: 40 })
  currency!: string;

  @Column('smallint', { unsigned: true })
  marketplaceFeeBps!: number;

  @Column('char', { length: 40, nullable: true })
  marketplaceFeeReceiver!: string | null;

  @Column('smallint', { unsigned: true })
  royaltiesBps!: number;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  startingRoyalties!: string | null;

  @Column('char', { length: 40, nullable: true })
  royaltiesReceiver!: string | null;

  @Column('timestamp without time zone')
  startTime!: Date;

  @PrimaryColumn('timestamp without time zone')
  endTime!: Date;

  @Column('numeric', { precision: 78, unsigned: true })
  counter!: string;

  @Column('text')
  signature!: string;

  @Column('text', { nullable: true })
  salt!: string;

  @Column('text', { nullable: true })
  zone!: string;

  @Column('text', { nullable: true })
  conduitKey!: string;

  @Column('char', { length: 40, nullable: true })
  protocolAddress!: string | null;

  @Column('char', { length: 64, nullable: true })
  cancelTxHash!: string | null;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true })
  cancelLogIdx!: string | null;

  @Column('timestamp without time zone', { nullable: true })
  cancelTimestamp!: Date | null;
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  fulfillQuantity!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  remainingQuantity!: string;

  @OneToMany(
    () => OrderItemEntity,
    (orderItemsEntity) => orderItemsEntity.order,
  )
  tokens?: OrderItemEntity[];
}
