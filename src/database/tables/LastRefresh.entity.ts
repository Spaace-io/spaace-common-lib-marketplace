import { BaseEntity, Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'last_refresh' })
export class LastRefreshEntity extends BaseEntity {
  @PrimaryColumn({ default: true })
  @Check('"pk" = TRUE')
  pk!: boolean;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
