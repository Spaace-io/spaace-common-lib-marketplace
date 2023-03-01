import { Message, PubSub } from '@google-cloud/pubsub';
import * as dotenv from 'dotenv';
import {
  PubSubCustomMessageData,
  PubSubTopics,
  PubSubSubscriptions,
} from './types';

dotenv.config();

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
    const topics = Object.values(PubSubTopics);
    for (const topic of topics) {
      try {
        const [exists] = await this.pubsub.topic(topic).exists();
        if (exists) {
          console.log(`Topic ${topic} already exists, skipping.`);
        } else {
          await this.pubsub.createTopic(topic);
          console.log(`Topic ${topic} created.`);
        }
      } catch (error) {
        console.log(`Error creating topic ${topic}:`, error);
      }
    }
  }

  /**
   * Create subscriptions if they don't exist
   */
  private async createSubscriptions() {
    const [topics] = await this.pubsub.getTopics();
    const subscriptions = Object.values(PubSubSubscriptions);

    subscriptions.forEach(async (subscription, idx) => {
      const topic = topics[idx];

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
      } catch (error) {
        console.log(`Error creating subscription ${subscription}:`, error);
      }
    });
  }

  /**
   * Publish a message to a topic
   * @param topicName - Topic name
   * @param data - Data to publish
   * @returns Message ID or null if error
   */
  public async publish<T = any>(
    topicName: PubSubTopics,
    data: PubSubCustomMessageData<T>,
  ): Promise<string | null> {
    const dataBuffer = Buffer.from(JSON.stringify(data));
    try {
      console.log('Publishing message:', data);
      return this.pubsub.topic(topicName).publishMessage({
        data: dataBuffer,
      });
    } catch (error) {
      console.log('Error publishing message:', error);
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
    callback: (message: Message) => any,
  ) {
    const subscription = this.pubsub.subscription(subscriptionName);
    subscription.on('message', callback);
  }
}

export default new PubSubClient();
