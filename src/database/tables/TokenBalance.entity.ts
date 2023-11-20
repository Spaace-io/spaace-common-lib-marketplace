import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'token_balances' })
@Index(['currency', 'balance'])
@Index(['userAddress', 'currency', 'balance'])
export class TokenBalanceEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  currency!: string;

  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78, default: '0' })
  balance!: string;
}
