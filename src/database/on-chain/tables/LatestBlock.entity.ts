import { BaseEntity, Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'latest_block' })
export class LatestBlockEntity extends BaseEntity {
  @PrimaryColumn({ default: true })
  @Check('pk = TRUE')
  pk!: boolean;

  @Column('numeric', { precision: 78 }) // 78 digits = Maximum uint256 value
  number!: number;

  @Column('char', { length: 64 })
  hash!: string;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
