import { RedisClientType, createClient } from 'redis';
import { CollectionEntity, ItemEntity } from '../database';
import { utils } from '..';
import { plainToInstance } from 'class-transformer';
import { serialize } from 'v8';
import { DebounceData, ExpiryHandler } from './interface';

const host = process.env.REDIS_HOST ?? 'redis';
const port = parseInt(process.env.REDIS_PORT ?? '6379', 10);
const connectionType =
  process.env.REDIS_USE_TLS === 'true' ? 'rediss' : 'redis';

class RedisClient {
  public readonly COLLECTIONS_KEY = 'collection-import:collections';
  public readonly COLLECTIONS_LIMIT = 100;
  public readonly ITEMS_KEY = 'collection-import:items';
  public readonly ITEMS_LIMIT = 100;

  private readonly redis: RedisClientType;
  private subscriber!: RedisClientType;

  constructor() {
    this.redis = createClient({
      url: `${connectionType}://${host}:${port}`,
    });
  }

  async initialize() {
    await this.redis.connect();
  }

  getRedisClient(): RedisClientType {
    return this.redis;
  }

  async subscribeServerSubscription(handler: ExpiryHandler) {
    this.subscriber = this.redis.duplicate();
    await this.subscriber.connect();
    await this.subscriber.pSubscribe('__keyevent@0__:expired', (keyName) => {
      if (keyName.startsWith('debounce:')) {
        handler(keyName);
      }
    });
  }

  async publishServerSubscribtions(data: DebounceData, delay: number) {
    const { userTwitterId, objectName, triggerName, queryParams } = data;
    const serializedQuery = serialize(queryParams).toString('base64'); // Serialize the queryParams object
    const debounceKey = `debounce:${userTwitterId}:${objectName}:${triggerName}:${serializedQuery}`;
    const result = await this.redis.set(debounceKey, 'active', {
      PX: delay * 1000,
      NX: true,
    });

    if (result) {
      console.log(`Debounce set for ${debounceKey}`);
    } else {
      console.log(`Debounce reset for ${debounceKey}`);
      await this.redis.pExpire(debounceKey, delay * 1000);
    }
  }

  async shouldImportCollections(limit = this.COLLECTIONS_LIMIT) {
    return (await this.redis.zCard(this.COLLECTIONS_KEY)) >= limit;
  }

  async importCollections(
    collections: readonly Pick<CollectionEntity, 'address'>[],
    priority = 1,
  ) {
    if (collections.length === 0) return;

    await collections
      .reduce(
        (transaction, collection) =>
          transaction.zIncrBy(
            this.COLLECTIONS_KEY,
            priority,
            utils.strip0x(collection.address),
          ),
        this.redis.multi(),
      )
      .exec();

    // TODO: this is not used anymore
    // if (await this.shouldImportCollections()) {
    //   pubsub.publish(PubSubTopic.COLLECTION_IMPORT, {
    //     trigger: CollectionImportRequest.COLLECTIONS,
    //     data: false,
    //   });
    // }
  }

  async popCollections(): Promise<Pick<CollectionEntity, 'address'>[]> {
    const entries = await this.redis.zPopMaxCount(
      this.COLLECTIONS_KEY,
      this.COLLECTIONS_LIMIT,
    );

    return entries.map(({ value }) =>
      plainToInstance(CollectionEntity, { address: value }),
    );
  }

  async readCollections(): Promise<Pick<CollectionEntity, 'address'>[]> {
    const entries = await this.redis.zRange(
      this.COLLECTIONS_KEY,
      '+inf',
      '-inf',
      {
        BY: 'SCORE',
        REV: true,
        LIMIT: { count: this.ITEMS_LIMIT, offset: 0 },
      },
    );

    return entries.map((value) =>
      plainToInstance(CollectionEntity, { address: value }),
    );
  }

  async removeCollections(
    items: Pick<CollectionEntity, 'address'>[],
  ): Promise<number> {
    const entries = items.map(({ address }) => {
      return address;
    });

    return await this.redis.zRem(this.COLLECTIONS_KEY, entries);
  }

  async shouldImportItems(limit = this.ITEMS_LIMIT) {
    return (await this.redis.zCard(this.ITEMS_KEY)) >= limit;
  }

  async importItems(
    items: readonly Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[],
    priority = 1,
  ) {
    if (items.length === 0) return;

    await items
      .reduce(
        (transaction, item) =>
          transaction.zIncrBy(
            this.ITEMS_KEY,
            priority,
            `${utils.strip0x(item.collectionAddress)}-${item.tokenId}`,
          ),
        this.redis.multi(),
      )
      .exec();

    // TODO: this is not used anymore
    // if (await this.shouldImportItems()) {
    //   pubsub.publish(PubSubTopic.COLLECTION_IMPORT, {
    //     trigger: CollectionImportRequest.ITEMS,
    //     data: false,
    //   });
    // }
  }

  async popItems(): Promise<
    Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[]
  > {
    const entries = await this.redis.zPopMaxCount(
      this.ITEMS_KEY,
      this.ITEMS_LIMIT,
    );

    return entries.map(({ value }) => {
      const [collectionAddress, tokenId] = value.split('-', 2);
      return plainToInstance(ItemEntity, { collectionAddress, tokenId });
    });
  }

  async readItems(): Promise<
    Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[]
  > {
    const entries = await this.redis.zRange(this.ITEMS_KEY, '+inf', '-inf', {
      BY: 'SCORE',
      REV: true,
      LIMIT: { count: this.ITEMS_LIMIT, offset: 0 },
    });

    return entries.map((value) => {
      const [collectionAddress, tokenId] = value.split('-', 2);
      return plainToInstance(ItemEntity, { collectionAddress, tokenId });
    });
  }

  async removeItems(
    items: Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[],
  ): Promise<number> {
    const entries = items.map(({ collectionAddress, tokenId }) => {
      return `${collectionAddress}-${tokenId}`;
    });

    return await this.redis.zRem(this.ITEMS_KEY, entries);
  }
}

export const redis = new RedisClient();
