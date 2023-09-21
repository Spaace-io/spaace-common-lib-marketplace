import { Message, PubSub } from '@google-cloud/pubsub';
import { MetadataImportTrigger, PubSubTrigger } from './types/trigger';
import { PUBSUB_TOPICS, PubsubTopic, QuestTrigger } from '..';

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
    const topics = Object.values(PUBSUB_TOPICS);

    await Promise.all(
      topics.map(async (topic) => {
        const [exists] = await this.pubsub.topic(topic).exists();
        if (exists) return;

        await this.pubsub.createTopic(topic);
      }),
    );
  }

  private getTopicFromName(topicName: PubsubTopic) {
    return PUBSUB_TOPICS[topicName];
  }

  private async subscribe(topicName: PubsubTopic, name: string) {
    let subscription = this.pubsub
      .topic(this.getTopicFromName(topicName))
      .subscription(name);

    const [exists] = await subscription.exists();
    if (!exists) [subscription] = await subscription.create();

    return subscription;
  }

  public async publish(
    topicName: PubsubTopic,
    ...messages: PubSubTrigger<QuestTrigger | MetadataImportTrigger>[]
  ) {
    const topic = this.pubsub.topic(this.getTopicFromName(topicName));
    return await Promise.all(
      messages.map((json) => topic.publishMessage({ json })),
    );
  }

  public async onTrigger(
    name: string,
    topicName: PubsubTopic,
    listener: (
      trigger: PubSubTrigger<QuestTrigger | MetadataImportTrigger>,
    ) => Promise<void>,
  ) {
    const subscription = await this.subscribe(topicName, name);
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
