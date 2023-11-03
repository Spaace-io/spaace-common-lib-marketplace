import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'token_transfers' })
@Index(['timestamp'])
export class TokenTransferEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  logIdx!: string;

  @Column('char', { length: 40 })
  from!: string;

  @Column('char', { length: 40 })
  to!: string;

  @Column('char', { length: 40 })
  currency!: string;

  @Column('numeric', { precision: 78, unsigned: true, default: '1' })
  amount!: string;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
