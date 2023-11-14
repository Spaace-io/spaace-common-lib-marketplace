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
    : T extends QuestTrigger.CART_ITEM
    ? CartItem
    : T extends QuestTrigger.CRON
    ? undefined
    : T extends QuestTrigger.USER_INTERACTION
    ? UserInteraction
    : T extends QuestTrigger.DATA_COMPILED
    ? object
    : T extends CollectionImportRequest.ITEMS
    ? Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[]
    : T extends CollectionImportRequest.COLLECTIONS
    ? Pick<CollectionEntity, 'address'>[]
    : T extends SearchIndexType.ITEM
    ? ItemEntity
    : T extends SearchIndexType.COLLECTION
    ? CollectionEntity
    : T extends SearchIndexType.USER
    ? User
    : never;
