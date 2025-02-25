import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PubSubTopic } from '../types';
interface ExchangeOptions {
    durable: boolean;
    arguments?: Record<string, any>;
}
export declare class RabbitMQClient {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    batchPublish<T extends PubSubTopic>(topic: T, routingKey: string, messages: any): Promise<void>;
    publish<T extends PubSubTopic>(topic: T, routingKey: string, message: any, delay?: number): void;
    subscribe<T extends PubSubTopic>(topic: T, routingKey: string, queueName: string, onMessage: (msg: any) => void, options?: Partial<ExchangeOptions>): Promise<void>;
}
export {};
