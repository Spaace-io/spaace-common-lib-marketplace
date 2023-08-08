import { Order, QuestTrigger, Sale, DistributorReward, Transfer, UserQuestProgress, StakingDeposit, StakingReward, User, TokenTransfer } from '../../database';
import { UserInteraction } from '../../graphql';
export declare const PUBSUB_TRIGGERS_TOPIC: string;
export type PubSubTriggerData<T extends QuestTrigger> = T extends QuestTrigger.TOKEN_TRANSFER ? TokenTransfer : T extends QuestTrigger.UNISWAP ? undefined : T extends QuestTrigger.TRANSFER ? Transfer : T extends QuestTrigger.SALE ? Sale : T extends QuestTrigger.ORDER ? Order : T extends QuestTrigger.STAKING_DEPOSIT ? StakingDeposit : T extends QuestTrigger.STAKING_REWARD ? StakingReward : T extends QuestTrigger.DISTRIBUTOR_REWARD ? DistributorReward : T extends QuestTrigger.USER_QUEST_PROGRESS ? UserQuestProgress : T extends QuestTrigger.REFERRAL ? User : T extends QuestTrigger.CART_ITEM ? undefined : T extends QuestTrigger.CRON ? undefined : T extends QuestTrigger.USER_INTERACTION ? UserInteraction : T extends QuestTrigger.DATA_COMPILED ? object : never;
export interface PubSubTrigger<T extends QuestTrigger> {
    trigger: T;
    data: PubSubTriggerData<T>;
}
