import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity } from 'typeorm';

@ObjectType()
@Entity({ name: 'staking_deposits' })
export class StakingDeposit extends BaseEntity {
  @Field()
  @Column('char', { length: 40 })
  user!: string;

  @Field()
  @Column('char', { length: 40 })
  pool!: string;

  @Field()
  @Column('numeric', { precision: 78 })
  amount!: string;

  @Field()
  @Column({ default: () => 'CURRENT_DATE' })
  date!: Date;
}
