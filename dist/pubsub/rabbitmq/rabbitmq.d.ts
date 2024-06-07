import { RabbitMQClient } from './rabbitmq.client';
import '../config';
export declare class RabbitMQ {
    static getAmpqConnectionFactory(prefetchCount?: number): Promise<import("@golevelup/nestjs-rabbitmq").AmqpConnection | undefined>;
    static getRabbitMQClient(prefetchCount?: number): Promise<RabbitMQClient>;
}
