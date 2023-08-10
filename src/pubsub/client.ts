import { Message, PubSub } from '@google-cloud/pubsub';
import { PubSubTrigger } from './types/trigger';
import { QuestTrigger } from '..';

export const PUBSUB_TRIGGERS_TOPIC = `triggers-${
  !process.env.TESTNET ? 'ethereum' : 'goerli'
}`;

class PubSubClient {
  private readonly pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({
      projectId: process.env.GCP_PROJECT,
    });
  }

  public async initialize() {
    await this.createTopics();
  }

  private async createTopics() {
    const topics = [PUBSUB_TRIGGERS_TOPIC];

    await Promise.all(
      topics.map(async (topic) => {
        const [exists] = await this.pubsub.topic(topic).exists();
        if (exists) return;

        await this.pubsub.createTopic(topic);
      }),
    );
  }

  private async subscribe(topic: string, name: string) {
    let subscription = this.pubsub.topic(topic).subscription(name);

    const [exists] = await subscription.exists();
    if (!exists) [subscription] = await subscription.create();

    return subscription;
  }

  public async trigger(...messages: PubSubTrigger<QuestTrigger>[]) {
    const topic = this.pubsub.topic(PUBSUB_TRIGGERS_TOPIC);
    return await Promise.all(
      messages.map((json) => topic.publishMessage({ json })),
    );
  }

  public async onTrigger(
    name: string,
    listener: (trigger: PubSubTrigger<QuestTrigger>) => Promise<void>,
  ) {
    const subscription = await this.subscribe(PUBSUB_TRIGGERS_TOPIC, name);
    subscription.on('message', async (message: Message) => {
      try {
        await listener(JSON.parse(message.data.toString()));
        message.ack();
      } catch (e) {
        message.nack();
        throw e;
      }
    });
  }
}

export const pubsub = new PubSubClient();
