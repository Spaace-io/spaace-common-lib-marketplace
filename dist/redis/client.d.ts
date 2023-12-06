import { RedisClientType } from 'redis';
import { CollectionEntity, ItemEntity } from '../database';
declare class RedisClient {
    readonly COLLECTIONS_LIMIT = 100;
    readonly ITEMS_LIMIT = 100;
    readonly redis: RedisClientType;
    constructor();
    importCollections(collections: readonly Pick<CollectionEntity, 'address'>[], priority?: number): Promise<void>;
    importItems(items: readonly Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[], priority?: number): Promise<void>;
}
export declare const redis: RedisClient;
export {};
