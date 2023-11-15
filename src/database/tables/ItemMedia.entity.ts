import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemEntity } from '.';

@Entity({ name: 'item_medias' })
@Index(['collectionAddress', 'tokenId'], { unique: true, where: '"primary"' })
@Index(['collectionAddress', 'tokenId', 'id'])
export class ItemMediaEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('char', { length: 40 })
  collectionAddress!: string;

  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ItemEntity)
  @JoinColumn([
    { name: 'collectionAddress', referencedColumnName: 'collectionAddress' },
    { name: 'tokenId', referencedColumnName: 'tokenId' },
  ])
  tokenId!: string;

  @Column('boolean')
  primary!: boolean;

  @Column('text')
  raw!: string;
}
