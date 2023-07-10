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

export enum QuestRewardType {
  LOYALTY_POINTS = 'LoyaltyPoints',
  STAKING_BONUS = 'StakingBonus',
  SPAACE_TOKENS = 'SpaaceTokens',
  COSMETIC = 'Cosmetic',
}

export class LoyaltyPointsQuestReward {
  readonly type = QuestRewardType.LOYALTY_POINTS;
  amount!: string;
}

export class StakingBonusQuestReward {
  readonly type = QuestRewardType.STAKING_BONUS;
  amount!: string;
}

export class SpaaceTokensQuestReward {
  readonly type = QuestRewardType.SPAACE_TOKENS;
  amount!: string;
}

export class CosmeticQuestReward {
  readonly type = QuestRewardType.COSMETIC;
  id!: string;
}

export type QuestReward =
  | LoyaltyPointsQuestReward
  | StakingBonusQuestReward
  | SpaaceTokensQuestReward
  | CosmeticQuestReward;

export enum QuestRuleOperator {
  EQ = '=',
  GT = '>',
  GTE = '>=',
  LT = '<',
  LTE = '<=',
  NEQ = '!=',
}

export class QuestRule {
  property!: string;
  operator!: QuestRuleOperator;
  value!: string;
  delta?: string;
}

export class QuestStep {
  trigger!: QuestTrigger;
  rules!: QuestRule[];
}

export enum QuestPeriod {
  DAILY = 'day',
  SEASONAL = 'season',
}

export class Quest {
  steps!: QuestStep[];
  rewards!: QuestReward[];
  limit?: number;
  period?: QuestPeriod;
}

export class Rank {
  id!: number;
  name!: string;
  loyaltyPointsThreshold!: string;
  rewards!: QuestReward[];
}

export class Season {
  id!: number;
  startDate!: Date;
  endDate?: Date;
  quests!: Quest[];
  ranks!: Rank[];
}
