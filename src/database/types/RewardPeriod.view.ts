import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { DistributorContract, RewardPeriodEntity } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(RewardPeriodEntity, 'period')
      .select('"period".*');
  },
  name: 'reward_periods_view',
})
export class RewardPeriod extends BaseEntity {
  @Field(() => DistributorContract)
  @ViewColumn()
  distributor!: DistributorContract;

  @Field(() => Date)
  @ViewColumn()
  startTime!: Date;

  @Field(() => Date)
  @ViewColumn()
  endTime!: Date;

  @Field(() => String)
  @ViewColumn()
  amount!: string;

  @Field(() => Boolean)
  @ViewColumn()
  distributed!: boolean;
}
