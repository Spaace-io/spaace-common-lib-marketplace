import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Item } from './Item.entity';

// Primary key = (txHash, logIdx, from, to, collection, item)
// Because one event (txHash + logIdx) can equal multiple transfers (e.g. TransferBatch)

@ObjectType()
@Entity({ name: 'transfers' })
export class Transfer extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @Field()
  @PrimaryColumn()
  logIdx!: number;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  from!: string;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  to!: string;

  @Field()
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => Item)
  @JoinColumn([
    { name: 'collection', referencedColumnName: 'collection' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  collection!: string;

  @Field()
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  amount!: string;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
