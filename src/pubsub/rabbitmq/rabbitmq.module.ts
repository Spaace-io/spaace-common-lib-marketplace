import { Module } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import '../../config';

const host = process.env.RABBITMQ_HOST ?? 'rabbitmq';
const port = parseInt(process.env.RABBITMQ_PORT ?? '5672', 10);
const username = process.env.RABBITMQ_USERNAME ?? 'guest';
const password = process.env.RABBITMQ_PASSWORD ?? 'guest';
const heartbeatIntervalInSeconds = process.env.RABBITMQ_HEARTBEAT_INTERVAL
  ? Number(process.env.RABBITMQ_HEARTBEAT_INTERVAL)
  : 5;

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: 'default',
      exchanges: [
        { name: 'triggers-exchange', type: 'topic' },
        { name: 'collection-import-exchange', type: 'topic' },
        { name: 'search-index-exchange', type: 'topic' },
        { name: 'data-exchange', type: 'topic' },
        { name: 'gql-message-exchange', type: 'topic' },
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
      uri: `amqp://${username}:${password}@${host}:${port}/`,
      enableControllerDiscovery: true,
      connectionManagerOptions: {
        heartbeatIntervalInSeconds,
      },
    }),
  ],
  providers: [RabbitMQClient],
  exports: [RabbitMQClient],
})
export class RabbitMQCustomModule {}
