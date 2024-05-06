import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQClient } from './rabbitmq.client';

export class RabbitMQ {
  static getAmpqConnectionFactory(prefetchCount?: number) {
    return RabbitMQModule.AmqpConnectionFactory({
      name: 'default',
      exchanges: [
        { name: 'triggers-exchange', type: 'topic' },
        { name: 'collection-import-exchange', type: 'topic' },
        { name: 'search-index-exchange', type: 'topic' },
        { name: 'data-exchange', type: 'topic' },

        { name: 'exchange1', type: 'topic' },
        {
          name: 'delayed-triggers-exchange',
          type: 'x-delayed-message',
          options: {
            durable: true,
            arguments: { 'x-delayed-type': 'topic' },
          },
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672/',
      enableControllerDiscovery: true,
      prefetchCount,
    });
  }

  static async getRabbitMQClient(prefetchCount?: number) {
    const amqpConnection = await RabbitMQ.getAmpqConnectionFactory(
      prefetchCount,
    );

    if (!amqpConnection) throw new Error('Failed to connect to RabbitMQ');

    return new RabbitMQClient(amqpConnection);
  }
}
