import { RabbitMQClient } from './rabbitmq.client';
export declare class RabbitMQ {
    static getAmpqConnectionFactory(): Promise<import("@golevelup/nestjs-rabbitmq").AmqpConnection | undefined>;
    static getRabbitMQClient(): Promise<RabbitMQClient>;
}
