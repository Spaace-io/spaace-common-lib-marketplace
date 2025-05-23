"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// rabbitmq-client.ts
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const types_1 = require("../types");
const exchangeMap_1 = require("./types/exchangeMap");
const disablePublishLogs = (_a = process.env.RABBITMQ_DISABLE_PUBLISH_LOGS) !== null && _a !== void 0 ? _a : false;
let RabbitMQClient = class RabbitMQClient {
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    batchPublish(topic, routingKey, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = exchangeMap_1.exchangeMap[topic];
            yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                durable: true,
            });
            this.amqpConnection.channel.publish(exchange, routingKey, messages ? Buffer.from(JSON.stringify(messages)) : Buffer.from(''));
            if (!disablePublishLogs) {
                console.debug(`Published message to ${exchange}:${routingKey}`);
            }
        });
    }
    publish(topic, routingKey, message, delay) {
        const exchange = delay
            ? exchangeMap_1.exchangeMap[types_1.PubSubTopic.DELAYED_TRIGGERS]
            : exchangeMap_1.exchangeMap[topic];
        const options = {
            durable: true,
        };
        // If a delay is specified, set delay arguments
        if (delay) {
            options.arguments = { 'x-delayed-type': 'topic', 'x-delay': delay };
            options.headers = { 'x-delay': delay };
        }
        this.amqpConnection.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), options);
        if (!disablePublishLogs) {
            console.debug(`Published message to ${exchange}:${routingKey} with ${delay ? delay + 'ms delay' : 'no delay'}`);
        }
    }
    subscribe(topic, routingKey, queueName, onMessage, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = exchangeMap_1.exchangeMap[topic];
                const exchangeType = topic === types_1.PubSubTopic.DELAYED_TRIGGERS ? 'x-delayed-message' : 'topic';
                options = Object.assign({ durable: true }, options);
                if (exchangeType === 'x-delayed-message') {
                    options.arguments = { 'x-delayed-type': 'topic' };
                }
                yield this.amqpConnection.createSubscriber((msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg) {
                        try {
                            onMessage(msg);
                        }
                        catch (error) {
                            console.error('Error processing message:', error);
                            return new nestjs_rabbitmq_1.Nack(false);
                        }
                    }
                }), {
                    exchange: exchange,
                    routingKey: routingKey,
                    queue: queueName,
                    queueOptions: {
                        arguments: options.arguments,
                        durable: options.durable,
                    },
                }, '', { noAck: false });
                console.log(`Subscribed to ${exchange}:${routingKey} with queue ${queueName}`);
            }
            catch (error) {
                console.error('Error setting up subscription:', error);
                throw error;
            }
        });
    }
};
exports.RabbitMQClient = RabbitMQClient;
exports.RabbitMQClient = RabbitMQClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], RabbitMQClient);
//# sourceMappingURL=rabbitmq.client.js.map