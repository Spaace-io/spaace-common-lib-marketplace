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
const pubsub_1 = require("@google-cloud/pubsub");
const types_1 = require("./types");
class PubSubClient {
    constructor() {
        this.pubsub = new pubsub_1.PubSub({
            projectId: process.env.PUBSUB_PROJECT_ID,
        });
    }
    /**
     * Initialize the PubSub client.
     * Create topics and subscriptions if they don't exist.
     */
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createTopics();
            yield this.createSubscriptions();
        });
    }
    /**
     * Create topics if they don't exist
     */
    createTopics() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(Object.values(types_1.PubSubTopics).map((topic) => __awaiter(this, void 0, void 0, function* () {
                const [exists] = yield this.pubsub.topic(topic).exists();
                if (exists) {
                    console.log(`Topic ${topic} already exists, skipping.`);
                }
                else {
                    yield this.pubsub.createTopic(topic);
                    console.log(`Topic ${topic} created.`);
                }
            })));
        });
    }
    /**
     * Create subscriptions if they don't exist
     */
    createSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const [topics] = yield this.pubsub.getTopics();
            Object.values(types_1.PubSubSubscriptions).forEach((subscription) => __awaiter(this, void 0, void 0, function* () {
                const topic = topics.find((topic) => topic.name.replace(/^projects\/[a-z0-9-]+\/topics\//, '') ===
                    subscription);
                if (topic === undefined) {
                    throw new Error(`Unknown topic ${subscription} (found ${topics
                        .map((topic) => topic.name.replace(/^projects\/[a-z0-9-]+\/topics\//, ''))
                        .join(', ')})`);
                }
                try {
                    const [exists] = yield topic.subscription(subscription).exists();
                    if (exists) {
                        console.log(`Subscription ${subscription} to topic ${topic.name} already exists, skipping.`);
                    }
                    else {
                        yield topic.createSubscription(subscription);
                        console.log(`Subscription ${subscription} to topic ${topic.name} created.`);
                    }
                }
                catch (e) {
                    console.error(`Error creating subscription ${subscription}:`, e);
                }
            }));
        });
    }
    /**
     * Publish a message to a topic
     * @param topicName - Topic name
     * @param data - Data to publish
     * @returns Message ID or null if error
     */
    publish(topicName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataBuffer = Buffer.from(JSON.stringify(data));
            try {
                console.debug('Publishing message:', data);
                return this.pubsub.topic(topicName).publishMessage({
                    data: dataBuffer,
                });
            }
            catch (e) {
                console.error('Error publishing message:', e);
                return null;
            }
        });
    }
    /**
     * Subscribe to a topic and listen for related messages
     * @param subscriptionName - Subscription name
     * @param callback - Callback function
     */
    subscribe(subscriptionName, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscription = this.pubsub.subscription(subscriptionName);
            subscription.on('message', callback);
        });
    }
}
exports.default = new PubSubClient();
//# sourceMappingURL=client.js.map