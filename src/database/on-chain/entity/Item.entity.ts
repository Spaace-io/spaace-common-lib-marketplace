import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Collection } from './Collection.entity';

export class Medias {
  raw!: string;

  thumbnail!: string;

  gateway!: string;
}

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Collection, (collection) => collection.items, { eager: true })
  collection!: Collection;

  @Column({ nullable: true })
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @Column({ nullable: true, unique: true })
  primaryId!: string;

  @Column({ default: false })
  isRefreshed!: boolean;

  @Column({ nullable: true })
  lastTimeUpdate!: Date;

  @Column({ nullable: true })
  tokenUri!: string;

  @Column('jsonb', { nullable: true })
  attributes!: object[];

  @Column('jsonb', { nullable: true })
  medias!: object[];

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  created_at!: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
  updated_at!: Date;

  @Column({ nullable: true })
  owner!: string[];
}
