import { Order, QuestTrigger, Sale, DistributorReward, Transfer, UserQuestProgress, StakingDeposit, StakingReward, User } from '../../database';
import { UserInteraction } from '../../graphql';
export declare const PUBSUB_TRIGGER_TOPIC = "trigger";
export type PubSubTriggerData<T extends QuestTrigger> = T extends QuestTrigger.SALE ? Sale : T extends QuestTrigger.TRANSFER ? Transfer : T extends QuestTrigger.ORDER ? Order : T extends QuestTrigger.UNISWAP ? undefined : T extends QuestTrigger.STAKING_DEPOSIT ? StakingDeposit : T extends QuestTrigger.STAKING_REWARD ? StakingReward : T extends QuestTrigger.DISTRIBUTOR_REWARD ? DistributorReward : T extends QuestTrigger.USER_QUEST_PROGRESS ? UserQuestProgress : T extends QuestTrigger.REFERRAL ? User : T extends QuestTrigger.CART_ITEM ? undefined : T extends QuestTrigger.TWITTER_POST ? undefined : T extends QuestTrigger.TWITTER_LIKE ? undefined : T extends QuestTrigger.TWITTER_RT ? undefined : T extends QuestTrigger.CRON ? undefined : T extends QuestTrigger.USER_INTERACTION ? UserInteraction : never;
export interface PubSubTrigger<T extends QuestTrigger> {
    trigger: T;
    data: PubSubTriggerData<T>;
}
