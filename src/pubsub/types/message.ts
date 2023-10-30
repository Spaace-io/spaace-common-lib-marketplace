import { PubSubTopic, PubSubTrigger, PubSubData } from '.';

export interface PubSubMessage<T extends PubSubTrigger<PubSubTopic>> {
  trigger: T;
  data: PubSubData<T>;
}
