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
const __1 = require("..");
class PubSubClient {
    constructor() {
        this.pubsub = new pubsub_1.PubSub({
            projectId: process.env.GCP_PROJECT,
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createTopics();
        });
    }
    createTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            const topics = Object.values(__1.PUBSUB_TOPICS);
            yield Promise.all(topics.map((topic) => __awaiter(this, void 0, void 0, function* () {
                const [exists] = yield this.pubsub.topic(topic).exists();
                if (exists)
                    return;
                yield this.pubsub.createTopic(topic);
            })));
        });
    }
    getTopicFromName(topicName) {
        return __1.PUBSUB_TOPICS[topicName];
    }
    subscribe(topicName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let subscription = this.pubsub
                .topic(this.getTopicFromName(topicName))
                .subscription(name);
            const [exists] = yield subscription.exists();
            if (!exists)
                [subscription] = yield subscription.create();
            return subscription;
        });
    }
    publish(topicName, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = this.pubsub.topic(this.getTopicFromName(topicName));
            return yield Promise.all(messages.map((json) => topic.publishMessage({ json })));
        });
    }
    onTrigger(name, topicName, listener) {
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