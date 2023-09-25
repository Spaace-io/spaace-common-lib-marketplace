import { ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'balances' })
@Index(['collectionAddress', 'tokenId', 'balance'], { where: '"balance" > 0' })
@Index(['userAddress', 'collectionAddress', 'tokenId'], {
  where: '"balance" > 0',
  unique: true,
})
export class BalanceEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  collectionAddress!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string;

  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78, default: '0' })
  balance!: string;
}
