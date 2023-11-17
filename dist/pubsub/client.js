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
exports.pubsub = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const _1 = require(".");
class PubSubClient {
    constructor() {
        this.pubsub = new pubsub_1.PubSub({
            projectId: process.env.GCP_PROJECT,
        });
    }
    _getTopicFromName(topic) {
        return `${topic}-${process.env.ENVIRONMENT}`;
    }
    _createTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.values(_1.PubSubTopic).map((topic) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const [exists] = yield this.pubsub
                        .topic(this._getTopicFromName(topic))
                        .exists();
                    if (exists)
                        return;
                    yield this.pubsub.createTopic(this._getTopicFromName(topic));
                }
                catch (e) {
                    if (e instanceof Error &&
                        'details' in e &&
                        e.details === 'Topic already exists') {
                        return;
                    }
                    throw e;
                }
            })));
        });
    }
    subscribe(topicName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let subscription = this.pubsub
                .topic(this._getTopicFromName(topicName))
                .subscription(name);
            const [exists] = yield subscription.exists();
            if (!exists) {
                [subscription] = yield subscription.create({
                    expirationPolicy: {
                        ttl: {
                            seconds: 24 * 60 * 60,
                        },
                    },
                });
            }
            return subscription;
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._createTopics();
        });
    }
    publish(topicName, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = this.pubsub.topic(this._getTopicFromName(topicName));
            return yield Promise.all(messages.map((json) => topic.publishMessage({
                json,
                attributes: { 'Content-Type': 'application/json' },
            })));
        });
    }
    onMessage(name, topicName, listener) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = yield this.subscribe(topicName, name);
            subscription.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield listener(JSON.parse(message.data.toString()));
                    message.ack();
                }
                catch (e) {
                    message.nack();
                    throw e;
                }
            }));
        });
    }
}
exports.pubsub = new PubSubClient();
//# sourceMappingURL=client.js.map