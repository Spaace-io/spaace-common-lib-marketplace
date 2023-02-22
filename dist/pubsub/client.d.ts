import { Topics, Subscriptions } from './types';
declare class PubSubClient {
    private pubsub;
    constructor();
    /**
     * Initialize the PubSub client.
     * Create topics and subscriptions if they don't exist.
     */
    init(): Promise<void>;
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
    publish(topicName: Topics, data: any): Promise<string | null>;
    /**
     * Subscribe to a topic and listen for related messages
     * @param subscriptionName - Subscription name
     * @param callback - Callback function
     */
    subscribe(subscriptionName: Subscriptions, callback: () => any): Promise<void>;
}
declare const _default: PubSubClient;
export default _default;
