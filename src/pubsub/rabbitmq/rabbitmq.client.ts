/* eslint-disable @typescript-eslint/no-explicit-any */
// rabbitmq-client.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection, Nack } from '@golevelup/nestjs-rabbitmq';
import { PubSubTopic } from '../types';
import { exchangeMap } from './types/exchangeMap';

interface ExchangeOptions {
  durable: boolean;
  arguments?: Record<string, any>;
}

const disablePublishLogs = process.env.RABBITMQ_DISABLE_PUBLISH_LOGS ?? false;

@Injectable()
export class RabbitMQClient {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async batchPublish<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    messages: any,
  ) {
    const exchange = exchangeMap[topic];
    await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    this.amqpConnection.channel.publish(
      exchange,
      routingKey,
      messages ? Buffer.from(JSON.stringify(messages)) : Buffer.from(''),
    );
    if (!disablePublishLogs) {
      console.debug(`Published message to ${exchange}:${routingKey}`);
    }
  }

  publish<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    message: any,
    delay?: number, // Optional delay parameter
  ) {
    const exchange = delay
      ? exchangeMap[PubSubTopic.DELAYED_TRIGGERS]
      : exchangeMap[topic];
    const options: any = {
      durable: true,
    };

    // If a delay is specified, set delay arguments
    if (delay) {
      options.arguments = { 'x-delayed-type': 'topic', 'x-delay': delay };
      options.headers = { 'x-delay': delay };
    }

    this.amqpConnection.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      options,
    );

    if (!disablePublishLogs) {
      console.debug(
        `Published message to ${exchange}:${routingKey} with ${
          delay ? delay + 'ms delay' : 'no delay'
        }`,
      );
    }
  }

  public async subscribe<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    queueName: string,
    onMessage: (msg: any) => void,
    options?: Partial<ExchangeOptions>,
  ) {
    try {
      const exchange = exchangeMap[topic];
      const exchangeType =
        topic === PubSubTopic.DELAYED_TRIGGERS ? 'x-delayed-message' : 'topic';
      options = { durable: true, ...options };

      if (exchangeType === 'x-delayed-message') {
        options.arguments = { 'x-delayed-type': 'topic' };
      }
      await this.amqpConnection.createSubscriber(
        async (msg: any) => {
          if (msg) {
            try {
              onMessage(msg);
            } catch (error) {
              console.error('Error processing message:', error);
              return new Nack(false);
            }
          }
        },
        {
          exchange: exchange,
          routingKey: routingKey,
          queue: queueName,
          queueOptions: {
            arguments: options.arguments,
            durable: options.durable,
          },
        },
        '',
        { noAck: false },
      );
      console.log(
        `Subscribed to ${exchange}:${routingKey} with queue ${queueName}`,
      );
    } catch (error) {
      console.error('Error setting up subscription:', error);
      throw error;
    }
  }
}
