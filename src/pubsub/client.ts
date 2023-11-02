import { Message, PubSub } from '@google-cloud/pubsub';
import { PubSubTopic, PubSubTrigger, PubSubMessage } from '.';

class PubSubClient {
  private readonly pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({
      projectId: process.env.GCP_PROJECT,
    });
  }

  private _getTopicFromName(topic: PubSubTopic) {
    return `${topic}-${process.env.ENVIRONMENT}`;
  }

  private async _createTopics() {
    await Promise.all(
      Object.values(PubSubTopic).map(async (topic) => {
        try {
          const [exists] = await this.pubsub
            .topic(this._getTopicFromName(topic))
            .exists();
          if (exists) return;

          await this.pubsub.createTopic(this._getTopicFromName(topic));
        } catch (e) {
          if (
            e instanceof Error &&
            'details' in e &&
            e.details === 'Topic already exists'
          ) {
            return;
          }
          throw e;
        }
      }),
    );
  }

  private async subscribe(topicName: PubSubTopic, name: string) {
    let subscription = this.pubsub
      .topic(this._getTopicFromName(topicName))
      .subscription(name);

    const [exists] = await subscription.exists();
    if (!exists) {
      [subscription] = await subscription.create({
        expirationPolicy: {
          ttl: {
            seconds: 24 * 60 * 60,
          },
        },
      });
    }

    return subscription;
  }

  public async initialize() {
    await this._createTopics();
  }

  public async publish<T extends PubSubTopic>(
    topicName: T,
    ...messages: PubSubMessage<PubSubTrigger<T>>[]
  ) {
    const topic = this.pubsub.topic(this._getTopicFromName(topicName));
    return await Promise.all(
      messages.map((json) => topic.publishMessage({ json })),
    );
  }

  public async onMessage<T extends PubSubTopic>(
    name: string,
    topicName: T,
    listener: (trigger: PubSubMessage<PubSubTrigger<T>>) => Promise<void>,
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
