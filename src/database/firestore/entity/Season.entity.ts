import {
  Field,
  ObjectType,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';

export enum QuestTrigger {
  SALE = 'Sale',
  ORDER = 'Order',
  UNISWAP = 'Uniswap',
  STAKING_REWARD = 'StakingReward',
  TRADING_REWARD = 'TradingReward',
  QUEST = 'Quest',
  REFERRAL = 'Referral',
  CART_ITEM = 'CartItem',
  TWITTER_POST = 'TwitterPost',
  TWITTER_LIKE = 'TwitterLike',
  TWITTER_RT = 'TwitterRT',
  CRON = 'Cron',
}

registerEnumType(QuestTrigger, {
  name: 'QuestTrigger',
});

@ObjectType()
export class LoyaltyPointsQuestReward {
  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class StakingBonusQuestReward {
  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class SpaaceTokensQuestReward {
  @Field(() => String)
  amount!: string;
}

@ObjectType()
export class CosmeticQuestReward {
  @Field(() => String)
  id!: string;
}

export const QuestReward = createUnionType({
  name: 'QuestReward',
  types: () => [
    LoyaltyPointsQuestReward,
    StakingBonusQuestReward,
    SpaaceTokensQuestReward,
    CosmeticQuestReward,
  ],
});

export enum QuestRuleOperator {
  EQ = '=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  NEQ = '!=',
}

registerEnumType(QuestRuleOperator, {
  name: 'QuestRuleOperator',
});

@ObjectType()
export class QuestRule {
  @Field(() => String)
  property!: string;

  @Field(() => QuestRuleOperator)
  operator!: QuestRuleOperator;

  @Field(() => String)
  value!: string;

  @Field(() => String, { nullable: true })
  delta!: string | null;
}

@ObjectType()
export class QuestStep {
  @Field(() => QuestTrigger)
  trigger!: QuestTrigger;

  @Field(() => [QuestRule])
  rules!: QuestRule[];
}

export enum QuestPeriod {
  DAILY = 'day',
  SEASONAL = 'season',
}

registerEnumType(QuestPeriod, {
  name: 'QuestPeriod',
});

@ObjectType()
export class Quest {
  @Field(() => [QuestStep])
  steps!: QuestStep[];

  @Field(() => [QuestReward])
  rewards!: (typeof QuestReward)[];

  @Field(() => Number, { nullable: true })
  limit!: number | null;

  @Field(() => QuestPeriod, { nullable: true })
  period!: QuestPeriod | null;
}

@ObjectType()
export class Rank {
  @Field(() => Number)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  loyaltyPointsThreshold!: string;

  @Field(() => [QuestReward])
  rewards!: (typeof QuestReward)[];
}

@ObjectType()
export class Season {
  @Field(() => Number)
  id!: number;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate!: Date | null;

  @Field(() => [Quest])
  quests!: Quest[];

  @Field(() => [Rank])
  ranks!: Rank[];
}
