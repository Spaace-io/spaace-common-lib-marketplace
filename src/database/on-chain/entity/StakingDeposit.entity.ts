import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'staking_deposits' })
export class StakingDeposit extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  user!: string;

  @Field()
  @PrimaryColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Field()
  @Column('char', { length: 40 })
  pool!: string;

  @Field()
  @Column('numeric', { precision: 78 })
  amount!: string;
}
