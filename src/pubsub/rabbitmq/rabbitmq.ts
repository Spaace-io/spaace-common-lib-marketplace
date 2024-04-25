import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQClient } from './rabbitmq.client';

export class RabbitMQ {
  static getAmpqConnectionFactory() {
    return RabbitMQModule.AmqpConnectionFactory({
      name: 'default',
      exchanges: [
        { name: 'triggers-exchange', type: 'topic' },
        { name: 'collection-import-exchange', type: 'topic' },
        { name: 'search-index-exchange', type: 'topic' },
        { name: 'data-exchange', type: 'topic' },

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
    });
  }

  static async getRabbitMQClient() {
    const amqpConnection = await RabbitMQ.getAmpqConnectionFactory();

    if (!amqpConnection) throw new Error('Failed to connect to RabbitMQ');

    return new RabbitMQClient(amqpConnection);
  }
}
