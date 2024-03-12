import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQClient } from './rabbitmq.client';

export class RabbitMQ {
  static getAmpqConnectionFactory() {
    return RabbitMQModule.AmqpConnectionFactory({
      name: 'default',
      exchanges: [
        {
          name: 'exchang1',
          type: 'topic',
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
