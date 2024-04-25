import { Module } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
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
    }),
  ],
  providers: [RabbitMQClient],
  exports: [RabbitMQClient],
})
export class RabbitMQCustomModule {}
