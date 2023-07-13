export enum PubSubTopics {
  EVENT = 'event',
  NOTIFICATION = 'notification',
}

export enum PubSubSubscriptions {
  EVENT = 'event',
  NOTIFICATION = 'notification',
}

export enum PubSubEvents {
  GREETING = 'greeting',
  ORDER = 'order',
  TRANSFER = 'transfer',
  SALE = 'sale',
}

export type PubSubCustomMessageData<T> = {
  event: PubSubEvents;
  data: T;
};
