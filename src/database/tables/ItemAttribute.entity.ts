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

@Entity({ name: 'item_attributes' })
@Index(['collectionAddress', 'traitHash', 'valueHash'])
@Index(['collectionAddress', 'tokenId'])
export class ItemAttributeEntity extends BaseEntity {
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
  traitHash!: string;

  @Column('text')
  trait!: string;

  @Column('char', { length: 40 })
  valueHash!: string;

  @Column('text')
  value!: string;
}
