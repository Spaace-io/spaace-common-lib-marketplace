import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActiveOrder1696261637384 implements MigrationInterface {
  name = 'ActiveOrder1696261637384';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(
      `CREATE OR REPLACE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND CASE "order"."type" WHEN 'BID' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) >= "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND CASE "order"."type" WHEN \'BID\' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) >= "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(
      `CREATE OR REPLACE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT "order"."startTime" <= NOW() AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) AND "order"."cancelTimestamp" IS NULL AND NOT EXISTS (SELECT * FROM "sales" "sale" WHERE "sale"."orderHash" = "order"."hash") AND CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN COALESCE((SELECT "balance"."balance" FROM "token_balances" "balance" WHERE "balance"."currency" = "order"."currency" AND "balance"."userAddress" = "order"."userAddress" AND "balance"."balance" > 0), 0) > "order"."price" ELSE COALESCE((SELECT "balance"."balance" FROM "balances" "balance" WHERE "balance"."userAddress" = "order"."userAddress" AND "balance"."collectionAddress" = "order"."collectionAddress" AND "balance"."tokenId" = "order"."tokenId" AND "balance"."balance" > 0), 0) > 0 END FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
  }
}
