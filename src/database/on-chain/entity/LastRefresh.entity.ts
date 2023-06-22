import { BaseEntity, Check, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'last_refresh' })
export class LastRefresh extends BaseEntity {
  @PrimaryColumn({ default: true })
  @Check('"pk" = TRUE')
  pk!: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
