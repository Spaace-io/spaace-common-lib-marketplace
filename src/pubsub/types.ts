export enum Topics {
  EVENT = 'event',
  NOTIFICATION = 'notification',
}

export enum Subscriptions {
  EVENT = 'event',
  NOTIFICATION = 'notification',
}

export enum Events {
  GREETING = 'greeting',
  ORDER = 'order',
  TRANSFER = 'transfer',
  SALE = 'sale',
}

export type CustomMessageData<T = any> = {
  event: Events;
  data: T;
};
