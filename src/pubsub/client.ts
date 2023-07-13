import { Message, PubSub } from '@google-cloud/pubsub';
import {
  PubSubCustomMessageData,
  PubSubTopics,
  PubSubSubscriptions,
} from './types';

class PubSubClient {
  private readonly pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({
      projectId: process.env.PUBSUB_PROJECT_ID,
    });
  }

  /**
   * Initialize the PubSub client.
   * Create topics and subscriptions if they don't exist.
   */
  public async initialize() {
    await this.createTopics();
    await this.createSubscriptions();
  }

  /**
   * Create topics if they don't exist
   */
  private async createTopics() {
    await Promise.all(
      Object.values(PubSubTopics).map(async (topic) => {
        const [exists] = await this.pubsub.topic(topic).exists();

        if (exists) {
          console.log(`Topic ${topic} already exists, skipping.`);
        } else {
          await this.pubsub.createTopic(topic);
          console.log(`Topic ${topic} created.`);
        }
      }),
    );
  }

  /**
   * Create subscriptions if they don't exist
   */
  private async createSubscriptions() {
    const [topics] = await this.pubsub.getTopics();

    Object.values(PubSubSubscriptions).forEach(async (subscription) => {
      const topic = topics.find(
        (topic) =>
          topic.name.replace(/^projects\/[a-z0-9-]+\/topics\//, '') ===
          subscription,
      );
      if (topic === undefined) {
        throw new Error(
          `Unknown topic ${subscription} (found ${topics
            .map((topic) =>
              topic.name.replace(/^projects\/[a-z0-9-]+\/topics\//, ''),
            )
            .join(', ')})`,
        );
      }

      try {
        const [exists] = await topic.subscription(subscription).exists();

        if (exists) {
          console.log(
            `Subscription ${subscription} to topic ${topic.name} already exists, skipping.`,
          );
        } else {
          await topic.createSubscription(subscription);
          console.log(
            `Subscription ${subscription} to topic ${topic.name} created.`,
          );
        }
      } catch (e) {
        console.error(`Error creating subscription ${subscription}:`, e);
      }
    });
  }

  /**
   * Publish a message to a topic
   * @param topicName - Topic name
   * @param data - Data to publish
   * @returns Message ID or null if error
   */
  public async publish<T>(
    topicName: PubSubTopics,
    data: PubSubCustomMessageData<T>,
  ): Promise<string | null> {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
      console.debug('Publishing message:', data);
      return this.pubsub.topic(topicName).publishMessage({
        data: dataBuffer,
      });
    } catch (e) {
      console.error('Error publishing message:', e);
      return null;
    }
  }

  /**
   * Subscribe to a topic and listen for related messages
   * @param subscriptionName - Subscription name
   * @param callback - Callback function
   */
  public async subscribe(
    subscriptionName: PubSubSubscriptions,
    callback: (message: Message) => void,
  ) {
    const subscription = this.pubsub.subscription(subscriptionName);
    subscription.on('message', callback);
  }
}

export default new PubSubClient();
