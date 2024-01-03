import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoyaltiesReceiver1704276623923 implements MigrationInterface {
  name = 'RoyaltiesReceiver1704276623923';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "royaltiesReceiver" character(40)`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" ADD "royaltiesReceiver" character(40)`,
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" DROP COLUMN "royaltiesReceiver"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "royaltiesReceiver"`,
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
  }
}
