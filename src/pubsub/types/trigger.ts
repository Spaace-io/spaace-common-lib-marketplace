import {
  Order,
  QuestTrigger,
  Sale,
  DistributorReward,
  Transfer,
  UserQuestProgress,
  StakingDeposit,
  StakingReward,
  User,
  TokenTransfer,
} from '../../database';
import { UserInteraction } from '../../graphql';

export const PUBSUB_TRIGGERS_TOPIC = `triggers-${
  process.env.TESTNET ? 'goerli' : 'ethereum'
}`;

export type PubSubTriggerData<T extends QuestTrigger> =
  T extends QuestTrigger.TOKEN_TRANSFER
    ? TokenTransfer
    : T extends QuestTrigger.UNISWAP
    ? undefined
    : T extends QuestTrigger.TRANSFER
    ? Transfer
    : T extends QuestTrigger.SALE
    ? Sale
    : T extends QuestTrigger.ORDER
    ? Order
    : T extends QuestTrigger.STAKING_DEPOSIT
    ? StakingDeposit
    : T extends QuestTrigger.STAKING_REWARD
    ? StakingReward
    : T extends QuestTrigger.DISTRIBUTOR_REWARD
    ? DistributorReward
    : T extends QuestTrigger.USER_QUEST_PROGRESS
    ? UserQuestProgress
    : T extends QuestTrigger.REFERRAL
    ? User
    : T extends QuestTrigger.CART_ITEM
    ? undefined
    : T extends QuestTrigger.CRON
    ? undefined
    : T extends QuestTrigger.USER_INTERACTION
    ? UserInteraction
    : never;

export interface PubSubTrigger<T extends QuestTrigger> {
  trigger: T;
  data: PubSubTriggerData<T>;
}
