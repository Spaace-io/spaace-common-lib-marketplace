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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
const database_1 = require("../database");
const __1 = require("..");
const class_transformer_1 = require("class-transformer");
const v8_1 = require("v8");
const host = (_a = process.env.REDIS_HOST) !== null && _a !== void 0 ? _a : 'redis';
const port = parseInt((_b = process.env.REDIS_PORT) !== null && _b !== void 0 ? _b : '6379', 10);
class RedisClient {
    constructor() {
        this.COLLECTIONS_KEY = 'collection-import:collections';
        this.COLLECTIONS_LIMIT = 100;
        this.ITEMS_KEY = 'collection-import:items';
        this.ITEMS_LIMIT = 100;
        this.redis = (0, redis_1.createClient)({
            url: `redis://${host}:${port}`,
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redis.connect();
        });
    }
    getRedisClient() {
        return this.redis;
    }
    subscribeServerSubscription(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscriber = this.redis.duplicate();
            yield this.subscriber.connect();
            yield this.subscriber.pSubscribe('__keyevent@0__:expired', (keyName) => {
                if (keyName.startsWith('debounce:')) {
                    handler(keyName);
                }
            });
        });
    }
    publishServerSubscribtions(data, delay) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userTwitterId, objectName, triggerName, queryParams } = data;
            const serializedQuery = (0, v8_1.serialize)(queryParams).toString('base64'); // Serialize the queryParams object
            const debounceKey = `debounce:${userTwitterId}:${objectName}:${triggerName}:${serializedQuery}`;
            const result = yield this.redis.set(debounceKey, 'active', {
                PX: delay * 1000,
                NX: true,
            });
            if (result) {
                console.log(`Debounce set for ${debounceKey}`);
            }
            else {
                console.log(`Debounce reset for ${debounceKey}`);
                yield this.redis.pExpire(debounceKey, delay * 1000);
            }
        });
    }
    shouldImportCollections(limit = this.COLLECTIONS_LIMIT) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.redis.zCard(this.COLLECTIONS_KEY)) >= limit;
        });
    }
    importCollections(collections, priority = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (collections.length === 0)
                return;
            yield collections
                .reduce((transaction, collection) => transaction.zIncrBy(this.COLLECTIONS_KEY, priority, __1.utils.strip0x(collection.address)), this.redis.multi())
                .exec();
            if (yield this.shouldImportCollections()) {
                __1.pubsub.publish(__1.PubSubTopic.COLLECTION_IMPORT, {
                    trigger: __1.CollectionImportRequest.COLLECTIONS,
                    data: false,
                });
            }
        });
    }
    popCollections() {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this.redis.zPopMaxCount(this.COLLECTIONS_KEY, this.COLLECTIONS_LIMIT);
            return entries.map(({ value }) => (0, class_transformer_1.plainToInstance)(database_1.CollectionEntity, { address: value }));
        });
    }
    shouldImportItems(limit = this.ITEMS_LIMIT) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.redis.zCard(this.ITEMS_KEY)) >= limit;
        });
    }
    importItems(items, priority = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            if (items.length === 0)
                return;
            yield items
                .reduce((transaction, item) => transaction.zIncrBy(this.ITEMS_KEY, priority, `${__1.utils.strip0x(item.collectionAddress)}-${item.tokenId}`), this.redis.multi())
                .exec();
            if (yield this.shouldImportItems()) {
                __1.pubsub.publish(__1.PubSubTopic.COLLECTION_IMPORT, {
                    trigger: __1.CollectionImportRequest.ITEMS,
                    data: false,
                });
            }
        });
    }
    popItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this.redis.zPopMaxCount(this.ITEMS_KEY, this.ITEMS_LIMIT);
            return entries.map(({ value }) => {
                const [collectionAddress, tokenId] = value.split('-', 2);
                return (0, class_transformer_1.plainToInstance)(database_1.ItemEntity, { collectionAddress, tokenId });
            });
        });
    }
}
exports.redis = new RedisClient();
//# sourceMappingURL=client.js.map