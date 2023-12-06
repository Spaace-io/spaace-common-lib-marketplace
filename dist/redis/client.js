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
exports.redis = void 0;
const redis_1 = require("redis");
const __1 = require("..");
class RedisClient {
    constructor() {
        var _a;
        this.COLLECTIONS_LIMIT = 100;
        this.ITEMS_LIMIT = 100;
        this.redis = (0, redis_1.createClient)({
            url: `redis://${process.env.REDIS_HOST}:${(_a = process.env.REDIS_PORT) !== null && _a !== void 0 ? _a : 6379}`,
        });
    }
    importCollections(collections, priority = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield collections
                .reduce((transaction, collection) => transaction.zIncrBy('collection-import:collections', priority, __1.utils.strip0x(collection.address)), this.redis.multi())
                .exec();
            if ((yield this.redis.zCard('collection-import:collections')) >=
                this.COLLECTIONS_LIMIT) {
                __1.pubsub.publish(__1.PubSubTopic.COLLECTION_IMPORT, {
                    trigger: __1.CollectionImportRequest.COLLECTIONS,
                    data: false,
                });
            }
        });
    }
    importItems(items, priority = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield items
                .reduce((transaction, item) => transaction.zIncrBy('collection-import:items', priority, `${__1.utils.strip0x(item.collectionAddress)}-${item.tokenId}`), this.redis.multi())
                .exec();
            if ((yield this.redis.zCard('collection-import:items')) >= this.ITEMS_LIMIT) {
                __1.pubsub.publish(__1.PubSubTopic.COLLECTION_IMPORT, {
                    trigger: __1.CollectionImportRequest.ITEMS,
                    data: false,
                });
            }
        });
    }
}
exports.redis = new RedisClient();
//# sourceMappingURL=client.js.map