import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderMarketplace1696006750090 implements MigrationInterface {
  name = 'OrderMarketplace1696006750090';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'collection_rankings', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "collection_rankings"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_8015da564b715d467c36eb4cfb" ON "orders" ("userAddress", "counter") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13aa42fa12b55cfcfad1e598a1" ON "orders" ("userAddress", "collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "collection_rankings" AS SELECT *, "volume1h" - "volumePrevious1h" AS "volumeChange1h", "volume6h" - "volumePrevious6h" AS "volumeChange6h", "volume24h" - "volumePrevious24h" AS "volumeChange24h", "volume7d" - "volumePrevious7d" AS "volumeChange7d", "volume30d" - "volumePrevious30d" AS "volumeChange30d", "floorPrice" - "floorPrevious1h" AS "floorChange1h", "floorPrice" - "floorPrevious6h" AS "floorChange6h", "floorPrice" - "floorPrevious24h" AS "floorChange24h", "floorPrice" - "floorPrevious7d" AS "floorChange7d", "floorPrice" - "floorPrevious30d" AS "floorChange30d" FROM (SELECT "collection"."address", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "volume", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume30d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 hour' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 hour'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '6 hours' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '6 hours'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 day' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 day'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '7 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '7 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '30 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '30 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious30d", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."active") AS "floorPrice", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '1 hour' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '1 hour' AND ("order"."endTime" > NOW() - INTERVAL '1 hour' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious1h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '6 hours' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '6 hours' AND ("order"."endTime" > NOW() - INTERVAL '6 hours' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious6h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '1 day' AND ("order"."endTime" > NOW() - INTERVAL '1 day' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious24h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '7 days' AND ("order"."endTime" > NOW() - INTERVAL '7 days' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious7d", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '30 days' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '30 days' AND ("order"."endTime" > NOW() - INTERVAL '30 days' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "saleCount", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days') AS "saleCount30d", (SELECT SUM("balance"."balance") FROM "balances" "balance" WHERE "balance"."collectionAddress" = "collection"."address" AND "balance"."balance" > 0) AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances" "balance" WHERE "balance"."collectionAddress" = "collection"."address" AND "balance"."balance" > 0) AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders_view" "order" WHERE "order"."type" != 'BID' AND "order"."collectionAddress" = "collection"."address" AND "order"."active") AS "listedCount" FROM "collections" "collection") "collection"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'collection_rankings',
        'SELECT *, "volume1h" - "volumePrevious1h" AS "volumeChange1h", "volume6h" - "volumePrevious6h" AS "volumeChange6h", "volume24h" - "volumePrevious24h" AS "volumeChange24h", "volume7d" - "volumePrevious7d" AS "volumeChange7d", "volume30d" - "volumePrevious30d" AS "volumeChange30d", "floorPrice" - "floorPrevious1h" AS "floorChange1h", "floorPrice" - "floorPrevious6h" AS "floorChange6h", "floorPrice" - "floorPrevious24h" AS "floorChange24h", "floorPrice" - "floorPrevious7d" AS "floorChange7d", "floorPrice" - "floorPrevious30d" AS "floorChange30d" FROM (SELECT "collection"."address", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "volume", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume30d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 hour\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 hour\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'6 hours\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'6 hours\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 day\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 day\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'7 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'7 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'30 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'30 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious30d", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."active") AS "floorPrice", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 hour\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'1 hour\' AND ("order"."endTime" > NOW() - INTERVAL \'1 hour\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious1h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'6 hours\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'6 hours\' AND ("order"."endTime" > NOW() - INTERVAL \'6 hours\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious6h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 day\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'1 day\' AND ("order"."endTime" > NOW() - INTERVAL \'1 day\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious24h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'7 days\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'7 days\' AND ("order"."endTime" > NOW() - INTERVAL \'7 days\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious7d", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'30 days\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'30 days\' AND ("order"."endTime" > NOW() - INTERVAL \'30 days\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND EXISTS ((SELECT 1 FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0))) AS "floorPrevious30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "saleCount", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\') AS "saleCount30d", (SELECT SUM("balance"."balance") FROM "balances" "balance" WHERE "balance"."collectionAddress" = "collection"."address" AND "balance"."balance" > 0) AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances" "balance" WHERE "balance"."collectionAddress" = "collection"."address" AND "balance"."balance" > 0) AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders_view" "order" WHERE "order"."type" != \'BID\' AND "order"."collectionAddress" = "collection"."address" AND "order"."active") AS "listedCount" FROM "collections" "collection") "collection"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'values', array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'value', "value"."value", 'count', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'values\', array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'value\', "value"."value", \'count\', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."medias" AS "medias", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport" FROM "items" "item"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'items_view',
        'SELECT "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."medias" AS "medias", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport" FROM "items" "item"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sales_view',
        'SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."timestamp" AS "timestamp", "deposit"."pool" AS "pool", "deposit"."amount" AS "amount" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."timestamp" AS "timestamp", "deposit"."pool" AS "pool", "deposit"."amount" AS "amount" FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."timestamp" AS "timestamp", "reward"."pool" AS "pool", "reward"."token" AS "token", "reward"."amount" AS "amount" FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."timestamp" AS "timestamp", "reward"."pool" AS "pool", "reward"."token" AS "token", "reward"."amount" AS "amount" FROM "staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be97d6a4240ed37553f4e48bd8" ON "collection_rankings" ("floorChange30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7710be4c181207608bfb0143d" ON "collection_rankings" ("floorChange7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c280af98a12bd7c6ba10d2bcc6" ON "collection_rankings" ("floorChange24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6b58d891f22af0ac89180cc114" ON "collection_rankings" ("floorChange6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06734c07e43ff351ebf493e33b" ON "collection_rankings" ("floorChange1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f4a7ccc1a482303f4e2691aa7" ON "collection_rankings" ("floorPrice") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_08ee63f23bde3eab0afb567b56" ON "collection_rankings" ("volumeChange30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4f3bd77a95b96e9963daaf1706" ON "collection_rankings" ("volumeChange7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3b15dc53cfd47a86e736e31376" ON "collection_rankings" ("volumeChange24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_00d7569f150c0af06ba3b23fed" ON "collection_rankings" ("volumeChange6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29b62298489f0c7aa98b4f560f" ON "collection_rankings" ("volumeChange1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8fb42993a0d4eb84ef95a5b20" ON "collection_rankings" ("volume30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ccd587b71f134cf49a39a98121" ON "collection_rankings" ("volume7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3826858600dd573e343f384b1" ON "collection_rankings" ("volume24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa037a61922e387470daf27f57" ON "collection_rankings" ("volume6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a55f3312d42ad5ed8e8118aaa5" ON "collection_rankings" ("volume1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b17a67a70e2f03413900e26f2a" ON "collection_rankings" ("volume") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_46257216fc882148eebb6da0a1" ON "collection_rankings" ("address") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'collection_rankings', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "collection_rankings"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_13aa42fa12b55cfcfad1e598a1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8015da564b715d467c36eb4cfb"`,
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT "balance".* FROM "balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT "balance".* FROM "balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "balance".* FROM "token_balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "balance".* FROM "token_balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order".*, (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances_view" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress"), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId"), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order".*, (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances_view" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress"), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId"), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "collection_rankings" AS SELECT *, "volume1h" - "volumePrevious1h" AS "volumeChange1h", "volume6h" - "volumePrevious6h" AS "volumeChange6h", "volume24h" - "volumePrevious24h" AS "volumeChange24h", "volume7d" - "volumePrevious7d" AS "volumeChange7d", "volume30d" - "volumePrevious30d" AS "volumeChange30d", "floorPrice" - "floorPrevious1h" AS "floorChange1h", "floorPrice" - "floorPrevious6h" AS "floorChange6h", "floorPrice" - "floorPrevious24h" AS "floorChange24h", "floorPrice" - "floorPrevious7d" AS "floorChange7d", "floorPrice" - "floorPrevious30d" AS "floorChange30d" FROM (SELECT "collection"."address", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "volume", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume30d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 hour' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 hour'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '6 hours' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '6 hours'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 day' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 day'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '7 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '7 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '30 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '30 days'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious30d", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."active") AS "floorPrice", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '1 hour' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '1 hour' AND ("order"."endTime" > NOW() - INTERVAL '1 hour' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious1h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '6 hours' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '6 hours' AND ("order"."endTime" > NOW() - INTERVAL '6 hours' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious6h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '1 day' AND ("order"."endTime" > NOW() - INTERVAL '1 day' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious24h", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '7 days' AND ("order"."endTime" > NOW() - INTERVAL '7 days' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious7d", (SELECT MIN(CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL '30 days' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "order"."startTime" <= NOW() - INTERVAL '30 days' AND ("order"."endTime" > NOW() - INTERVAL '30 days' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "saleCount", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days') AS "saleCount30d", (SELECT SUM("balance"."balance") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders_view" "order" WHERE "order"."type" != 'BID' AND "order"."collectionAddress" = "collection"."address" AND "order"."active") AS "listedCount" FROM "collections" "collection") "collection"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'collection_rankings',
        'SELECT *, "volume1h" - "volumePrevious1h" AS "volumeChange1h", "volume6h" - "volumePrevious6h" AS "volumeChange6h", "volume24h" - "volumePrevious24h" AS "volumeChange24h", "volume7d" - "volumePrevious7d" AS "volumeChange7d", "volume30d" - "volumePrevious30d" AS "volumeChange30d", "floorPrice" - "floorPrevious1h" AS "floorChange1h", "floorPrice" - "floorPrevious6h" AS "floorChange6h", "floorPrice" - "floorPrevious24h" AS "floorChange24h", "floorPrice" - "floorPrevious7d" AS "floorChange7d", "floorPrice" - "floorPrevious30d" AS "floorChange30d" FROM (SELECT "collection"."address", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "volume", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volume30d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 hour\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 hour\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious1h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'6 hours\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'6 hours\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious6h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 day\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 day\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious24h", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'7 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'7 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious7d", (SELECT COALESCE((SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'30 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'30 days\'), 0) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "volumePrevious30d", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."active") AS "floorPrice", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 hour\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'1 hour\' AND ("order"."endTime" > NOW() - INTERVAL \'1 hour\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious1h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'6 hours\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'6 hours\' AND ("order"."endTime" > NOW() - INTERVAL \'6 hours\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious6h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'1 day\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'1 day\' AND ("order"."endTime" > NOW() - INTERVAL \'1 day\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious24h", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'7 days\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'7 days\' AND ("order"."endTime" > NOW() - INTERVAL \'7 days\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious7d", (SELECT MIN(CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - INTERVAL \'30 days\' - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END) FROM "orders_view" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "order"."startTime" <= NOW() - INTERVAL \'30 days\' AND ("order"."endTime" > NOW() - INTERVAL \'30 days\' OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "floorPrevious30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "saleCount", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\') AS "saleCount30d", (SELECT SUM("balance"."balance") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders_view" "order" WHERE "order"."type" != \'BID\' AND "order"."collectionAddress" = "collection"."address" AND "order"."active") AS "listedCount" FROM "collections" "collection") "collection"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward".* FROM "distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward".* FROM "distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT "item".* FROM "items" "item"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      ['public', 'VIEW', 'items_view', 'SELECT "item".* FROM "items" "item"'],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute".* FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute".* FROM "item_attributes" "attribute"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period".* FROM "reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period".* FROM "reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale".* FROM "sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      ['public', 'VIEW', 'sales_view', 'SELECT "sale".* FROM "sales" "sale"'],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit".* FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit".* FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward".* FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward".* FROM "staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer".* FROM "token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer".* FROM "token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer".* FROM "transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer".* FROM "transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection".*, COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'values', array_to_json(ARRAY (SELECT json_build_object('collectionAddress', "collection"."address", 'trait', "attribute"."trait", 'value', "value"."value", 'count', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection".*, COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."floorPrice", 0) AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'values\', array_to_json(ARRAY (SELECT json_build_object(\'collectionAddress\', "collection"."address", \'trait\', "attribute"."trait", \'value\', "value"."value", \'count\', COUNT(DISTINCT "value"."tokenId")) FROM "item_attributes" "value" WHERE "value"."collectionAddress" = "collection"."address" AND "value"."trait" = "attribute"."trait" GROUP BY "value"."value"))) FROM "item_attributes" "attribute" WHERE "attribute"."collectionAddress" = "collection"."address" GROUP BY "attribute"."trait")) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "attributes", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" INNER JOIN "collection_rankings" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
  }
}
