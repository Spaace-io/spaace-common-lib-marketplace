import { Message } from '@google-cloud/pubsub';
import { Topics, Subscriptions, CustomMessageData } from './types';
declare class PubSubClient {
    private pubsub;
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
    publish<T = any>(topicName: Topics, data: CustomMessageData<T>): Promise<string | null>;
    /**
     * Subscribe to a topic and listen for related messages
     * @param subscriptionName - Subscription name
     * @param callback - Callback function
     */
    subscribe(subscriptionName: Subscriptions, callback: (message: Message) => any): Promise<void>;
}
declare const _default: PubSubClient;
export default _default;
