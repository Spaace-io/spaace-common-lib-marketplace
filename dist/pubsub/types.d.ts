export declare enum PubSubTopics {
    EVENT = "event",
    NOTIFICATION = "notification"
}
export declare enum PubSubSubscriptions {
    EVENT = "event",
    NOTIFICATION = "notification"
}
export declare enum PubSubEvents {
    GREETING = "greeting",
    ORDER = "order",
    TRANSFER = "transfer",
    SALE = "sale"
}
export type PubSubCustomMessageData<T> = {
    event: PubSubEvents;
    data: T;
};
