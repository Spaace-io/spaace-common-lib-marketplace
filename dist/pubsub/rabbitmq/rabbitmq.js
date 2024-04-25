"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const rabbitmq_client_1 = require("./rabbitmq.client");
class RabbitMQ {
    static getAmpqConnectionFactory() {
        return nestjs_rabbitmq_1.RabbitMQModule.AmqpConnectionFactory({
            name: 'default',
            exchanges: [
                { name: 'triggers-exchange', type: 'topic' },
                { name: 'collection-import-exchange', type: 'topic' },
                { name: 'search-index-exchange', type: 'topic' },
                { name: 'data-exchange', type: 'topic' },
            ],
            uri: 'amqp://guest:guest@rabbitmq:5672/',
            enableControllerDiscovery: true,
        });
    }
    static getRabbitMQClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const amqpConnection = yield RabbitMQ.getAmpqConnectionFactory();
            if (!amqpConnection)
                throw new Error('Failed to connect to RabbitMQ');
            return new rabbitmq_client_1.RabbitMQClient(amqpConnection);
        });
    }
}
exports.RabbitMQ = RabbitMQ;
//# sourceMappingURL=rabbitmq.js.map