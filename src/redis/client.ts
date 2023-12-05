import { RedisClientType, createClient } from 'redis';
import { CollectionEntity, ItemEntity } from '../database';
import { utils } from '..';

class RedisClient {
  private readonly redis: RedisClientType;

  constructor() {
    this.redis = createClient({
      url: `redis://${process.env.REDIS_HOST}:${
        process.env.REDIS_PORT ?? 6379
      }`,
    });
  }

  async importItems(
    items: readonly Pick<ItemEntity, 'collectionAddress' | 'tokenId'>[],
    priority = 1,
  ) {
    await items
      .reduce(
        (transaction, item) =>
          transaction.zIncrBy(
            'collection-import:items',
            priority,
            `${utils.strip0x(item.collectionAddress)}-${item.tokenId}`,
          ),
        this.redis.multi(),
      )
      .exec();
  }

  async importCollections(
    collections: readonly Pick<CollectionEntity, 'address'>[],
    priority = 1,
  ) {
    await collections
      .reduce(
        (transaction, collection) =>
          transaction.zIncrBy(
            'collection-import:collections',
            priority,
            utils.strip0x(collection.address),
          ),
        this.redis.multi(),
      )
      .exec();
  }

  async computeRarity(
    collections: readonly Pick<CollectionEntity, 'address'>[],
    priority = 1,
  ) {
    await collections
      .reduce(
        (transaction, collection) =>
          transaction.zIncrBy(
            'collection-import:rarity',
            priority,
            utils.strip0x(collection.address),
          ),
        this.redis.multi(),
      )
      .exec();
  }
}

export const redis = new RedisClient();
