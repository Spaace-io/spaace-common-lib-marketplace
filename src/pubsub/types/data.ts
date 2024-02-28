import {
  Order,
  QuestTrigger,
  SaleEntity,
  DistributorRewardEntity,
  TransferEntity,
  UserQuestProgress,
  StakingDepositEntity,
  User,
  TokenTransferEntity,
  CartItem,
  CollectionEntity,
  ItemEntity,
  ItemMediaEntity,
  ArenaUser,
  ArenaQuestTrigger,
} from '../../database';
import { UserInteraction } from '../../graphql';
import {
  CollectionImportRequest,
  PubSubTopic,
  PubSubTrigger,
  SearchIndexType,
} from '.';

export type PubSubData<T extends PubSubTrigger<PubSubTopic>> =
  T extends QuestTrigger.TOKEN_TRANSFER
    ? TokenTransferEntity
    : T extends QuestTrigger.UNISWAP
    ? undefined
    : T extends QuestTrigger.TRANSFER
    ? TransferEntity
    : T extends QuestTrigger.SALE
    ? SaleEntity
    : T extends QuestTrigger.ORDER
    ? Order
    : T extends QuestTrigger.STAKING_DEPOSIT
    ? StakingDepositEntity
    : T extends QuestTrigger.DISTRIBUTOR_REWARD
    ? DistributorRewardEntity
    : T extends QuestTrigger.USER_QUEST_PROGRESS
    ? UserQuestProgress
    : T extends QuestTrigger.REFERRAL
    ? User
    : T extends QuestTrigger.USER
    ? User
    : T extends QuestTrigger.CART_ITEM
    ? CartItem
    : T extends QuestTrigger.USER_INTERACTION
    ? UserInteraction
    : T extends QuestTrigger.DATA_COMPILED
    ? object
    : T extends CollectionImportRequest.COLLECTIONS
    ? boolean
    : T extends CollectionImportRequest.ITEMS
    ? boolean
    : T extends SearchIndexType.ITEM
    ? ItemEntity & { primaryMedia: ItemMediaEntity | null }
    : T extends SearchIndexType.COLLECTION
    ? CollectionEntity
    : T extends SearchIndexType.USER
    ? User
    : never;

export interface Tweet {
  authorUsername: string;
  text: string;
  metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count: number;
    impression_count: number;
  };
}

export type ArenaPubSubData<T extends ArenaQuestTrigger> =
  T extends ArenaQuestTrigger.USER
    ? ArenaUser
    : T extends ArenaQuestTrigger.REFERRAL
    ? ArenaUser
    : T extends ArenaQuestTrigger.SOCIAL
    ? Tweet
    : T extends ArenaQuestTrigger.SOCIAL_PRIME
    ? Tweet
    : never;
