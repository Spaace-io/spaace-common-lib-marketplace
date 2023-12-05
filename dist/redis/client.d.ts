import { CollectionEntity, ItemEntity } from '../database';
declare class RedisClient {
    private readonly redis;
    constructor();
    importItems(items: readonly Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[], priority?: number): Promise<void>;
    importCollections(collections: readonly Pick<CollectionEntity, 'address'>[], priority?: number): Promise<void>;
    computeRarity(collections: readonly Pick<CollectionEntity, 'address'>[], priority?: number): Promise<void>;
}
export declare const redis: RedisClient;
export {};
