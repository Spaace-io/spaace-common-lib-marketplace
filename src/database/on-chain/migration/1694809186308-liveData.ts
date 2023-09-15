import { MigrationInterface, QueryRunner } from 'typeorm';

export class LiveData1694809186308 implements MigrationInterface {
  name = 'LiveData1694809186308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume7d"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volume30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange30d"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "totalSupply"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "ownerCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount30d"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume1h"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange1h"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume6h"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "attributes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volume24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange24h"`,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection".*, (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour') AS "volume1h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 hour' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 hour') AS "volumeChange1h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours') AS "volume6h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '6 hours' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '6 hours') AS "volumeChange6h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day') AS "volume24h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '1 day' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '1 day') AS "volumeChange24h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days') AS "volume7d", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '7 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '7 days') AS "volumeChange7d", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days') AS "volume30d", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - (INTERVAL '30 days' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL '30 days') AS "volumeChange30d", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "volume", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 hour') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '6 hours') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '1 day') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '7 days') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND "sale"."timestamp" > NOW() - INTERVAL '30 days') AS "saleCount30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')) AS "saleCount", (SELECT SUM("balance"."balance") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION', 'ENGLISH_AUCTION') AND "order"."collectionAddress" = "collection"."address" AND "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "listedCount" FROM "collections" "collection"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection".*, (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\') AS "volume1h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 hour\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 hour\') AS "volumeChange1h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\') AS "volume6h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'6 hours\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'6 hours\') AS "volumeChange6h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\') AS "volume24h", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'1 day\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'1 day\') AS "volumeChange24h", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\') AS "volume7d", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'7 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'7 days\') AS "volumeChange7d", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\') AS "volume30d", (SELECT (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\') - SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - (INTERVAL \'30 days\' * 2) AND "sale"."timestamp" <= NOW() - INTERVAL \'30 days\') AS "volumeChange30d", (SELECT SUM("sale"."price") FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "volume", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 hour\') AS "saleCount1h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'6 hours\') AS "saleCount6h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'1 day\') AS "saleCount24h", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'7 days\') AS "saleCount7d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND "sale"."timestamp" > NOW() - INTERVAL \'30 days\') AS "saleCount30d", (SELECT COUNT(*) FROM "sales" "sale" WHERE "sale"."collectionAddress" = "collection"."address" AND "sale"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\')) AS "saleCount", (SELECT SUM("balance"."balance") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "totalSupply", (SELECT COUNT(DISTINCT "balance"."userAddress") FROM "balances_view" "balance" WHERE "balance"."collectionAddress" = "collection"."address") AS "ownerCount", (SELECT COUNT(DISTINCT "order"."tokenId") FROM "orders" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\', \'ENGLISH_AUCTION\') AND "order"."collectionAddress" = "collection"."address" AND "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND "order"."currency" IN (\'0000000000000000000000000000000000000000\', \'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\') AND (SELECT "balance"."balance" FROM "balances_view" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId") > 0) AS "listedCount" FROM "collections" "collection"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "collections" ADD "attributes" jsonb`);
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "ownerCount" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "totalSupply" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorPrice" numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
  }
}
