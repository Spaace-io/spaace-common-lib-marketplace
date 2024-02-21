import { PubSubTopic, PubSubTrigger, PubSubData, ArenaPubSubData } from '.';
import { ArenaQuestTrigger } from '../../database';
export interface PubSubMessage<T extends PubSubTrigger<PubSubTopic>> {
    trigger: T;
    data: PubSubData<T>;
}
export interface ArenaPubSubMessage {
    trigger: ArenaQuestTrigger;
    data: ArenaPubSubData<ArenaQuestTrigger>;
}
