import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ArenaPubSubMessage, ArenaPubSubTrigger, PubSubMessage, PubSubTopic, PubSubTrigger } from '../types';
export declare class RabbitMQClient {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    batchPublish<T extends PubSubTopic>(topic: T, routingKey: string, messages: any): Promise<void>;
    publish<T extends PubSubTopic>(topic: T, routingKey: string, message: any): Promise<void>;
    subscribe<T extends PubSubTopic>(topic: T, routingKey: string, queueName: string, onMessage: (msg: PubSubMessage<PubSubTrigger<T>> | ArenaPubSubMessage<ArenaPubSubTrigger<T>> | PubSubMessage<PubSubTrigger<T>>[] | ArenaPubSubMessage<ArenaPubSubTrigger<T>>[]) => void): Promise<void>;
}
