import { Message } from '@google-cloud/pubsub';
import { PubSubCustomMessageData, PubSubTopics, PubSubSubscriptions } from './types';
declare class PubSubClient {
    private readonly pubsub;
    constructor();
    /**
     * Initialize the PubSub client.
     * Create topics and subscriptions if they don't exist.
     */
    initialize(): Promise<void>;
    /**
     * Create topics if they don't exist
     */
    private createTopics;
    /**
     * Create subscriptions if they don't exist
     */
    private createSubscriptions;
    /**
     * Publish a message to a topic
     * @param topicName - Topic name
     * @param data - Data to publish
     * @returns Message ID or null if error
     */
    publish<T>(topicName: PubSubTopics, data: PubSubCustomMessageData<T>): Promise<string | null>;
    /**
     * Subscribe to a topic and listen for related messages
     * @param subscriptionName - Subscription name
     * @param callback - Callback function
     */
    subscribe(subscriptionName: PubSubSubscriptions, callback: (message: Message) => void): Promise<void>;
}
declare const _default: PubSubClient;
export default _default;
