import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730451505863 implements MigrationInterface {
  name = 'Migrations1730451505863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_orders_cache_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_orders_cache_view"`);
    await queryRunner.query(
      `CREATE VIEW "active_orders_cache_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_orders_cache_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_orders_cache_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_orders_cache_view"`);
    await queryRunner.query(
      `CREATE VIEW "active_orders_cache_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_orders_cache_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"',
      ],
    );
  }
}
