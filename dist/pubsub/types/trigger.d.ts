import { Order, QuestTrigger, SaleEntity, DistributorRewardEntity, TransferEntity, UserQuestProgress, StakingDepositEntity, StakingRewardEntity, User, TokenTransferEntity, CartItem, Item, Collection } from '../../database';
import { UserInteraction } from '../../graphql';
export declare enum MetadataImportTrigger {
    ITEM = "ITEM",
    COLLECTION = "COLLECTION"
}
export type PubSubTriggerData<T extends QuestTrigger | MetadataImportTrigger> = T extends QuestTrigger.TOKEN_TRANSFER ? TokenTransferEntity : T extends QuestTrigger.UNISWAP ? undefined : T extends QuestTrigger.TRANSFER ? TransferEntity : T extends QuestTrigger.SALE ? SaleEntity : T extends QuestTrigger.ORDER ? Order : T extends QuestTrigger.STAKING_DEPOSIT ? StakingDepositEntity : T extends QuestTrigger.STAKING_REWARD ? StakingRewardEntity : T extends QuestTrigger.DISTRIBUTOR_REWARD ? DistributorRewardEntity : T extends QuestTrigger.USER_QUEST_PROGRESS ? UserQuestProgress : T extends QuestTrigger.REFERRAL ? User : T extends QuestTrigger.CART_ITEM ? CartItem : T extends QuestTrigger.CRON ? undefined : T extends QuestTrigger.USER_INTERACTION ? UserInteraction : T extends QuestTrigger.DATA_COMPILED ? object : T extends MetadataImportTrigger.ITEM ? Item : T extends MetadataImportTrigger.COLLECTION ? Collection : never;
export interface PubSubTrigger<T extends QuestTrigger | MetadataImportTrigger> {
    trigger: T;
    data: PubSubTriggerData<T>;
}
