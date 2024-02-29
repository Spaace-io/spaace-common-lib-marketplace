import {
  PubSubTopic,
  PubSubTrigger,
  ArenaPubSubTrigger,
  PubSubData,
  ArenaPubSubData,
} from '.';

export interface PubSubMessage<T extends PubSubTrigger<PubSubTopic>> {
  trigger: T;
  data: PubSubData<T>;
}

export interface ArenaPubSubMessage<T extends ArenaPubSubTrigger<PubSubTopic>> {
  trigger: T;
  data: ArenaPubSubData<T>;
}
