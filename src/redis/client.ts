import { RedisClientType, createClient } from 'redis';
import { CollectionEntity, ItemEntity } from '../database';
import { CollectionImportRequest, PubSubTopic, pubsub, utils } from '..';

class RedisClient {
  public readonly COLLECTIONS_LIMIT = 100;
  public readonly ITEMS_LIMIT = 100;

  public readonly redis: RedisClientType;

  constructor() {
    this.redis = createClient({
      url: `redis://${process.env.REDIS_HOST}:${
        process.env.REDIS_PORT ?? 6379
      }`,
    });
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

    if (
      (await this.redis.zCard('collection-import:collections')) >=
      this.COLLECTIONS_LIMIT
    ) {
      pubsub.publish(PubSubTopic.COLLECTION_IMPORT, {
        trigger: CollectionImportRequest.COLLECTIONS,
        data: false,
      });
    }
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

    if (
      (await this.redis.zCard('collection-import:items')) >= this.ITEMS_LIMIT
    ) {
      pubsub.publish(PubSubTopic.COLLECTION_IMPORT, {
        trigger: CollectionImportRequest.ITEMS,
        data: false,
      });
    }
  }
}

export const redis = new RedisClient();
