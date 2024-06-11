import { RedisClientType } from 'redis';
import { CollectionEntity, ItemEntity } from '../database';
import { DebounceData, ExpiryHandler } from './interface';
declare class RedisClient {
    readonly COLLECTIONS_KEY = "collection-import:collections";
    readonly COLLECTIONS_LIMIT = 100;
    readonly ITEMS_KEY = "collection-import:items";
    readonly ITEMS_LIMIT = 100;
    private readonly redis;
    private subscriber;
    constructor();
    initialize(): Promise<void>;
    getRedisClient(): RedisClientType;
    subscribeServerSubscription(handler: ExpiryHandler): Promise<void>;
    publishServerSubscribtions(data: DebounceData, delay: number): Promise<void>;
    shouldImportCollections(limit?: number): Promise<boolean>;
    importCollections(collections: readonly Pick<CollectionEntity, 'address'>[], priority?: number): Promise<void>;
    popCollections(): Promise<Pick<CollectionEntity, 'address'>[]>;
    shouldImportItems(limit?: number): Promise<boolean>;
    importItems(items: readonly Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[], priority?: number): Promise<void>;
    popItems(): Promise<Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[]>;
}
export declare const redis: RedisClient;
export {};
