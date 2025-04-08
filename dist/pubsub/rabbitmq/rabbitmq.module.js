"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQCustomModule = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_client_1 = require("./rabbitmq.client");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
require("../../config");
const host = (_a = process.env.RABBITMQ_HOST) !== null && _a !== void 0 ? _a : 'rabbitmq';
const port = parseInt((_b = process.env.RABBITMQ_PORT) !== null && _b !== void 0 ? _b : '5672', 10);
const username = (_c = process.env.RABBITMQ_USERNAME) !== null && _c !== void 0 ? _c : 'guest';
const password = (_d = process.env.RABBITMQ_PASSWORD) !== null && _d !== void 0 ? _d : 'guest';
const heartbeatIntervalInSeconds = process.env.RABBITMQ_HEARTBEAT_INTERVAL
    ? Number(process.env.RABBITMQ_HEARTBEAT_INTERVAL)
    : 5;
let RabbitMQCustomModule = class RabbitMQCustomModule {
};
exports.RabbitMQCustomModule = RabbitMQCustomModule;
exports.RabbitMQCustomModule = RabbitMQCustomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot({
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
        providers: [rabbitmq_client_1.RabbitMQClient],
        exports: [rabbitmq_client_1.RabbitMQClient],
    })
], RabbitMQCustomModule);
//# sourceMappingURL=rabbitmq.module.js.map