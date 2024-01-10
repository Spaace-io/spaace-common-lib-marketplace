import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCollectionBalanceFields1704902661953
  implements MigrationInterface
{
  name = 'AddCollectionBalanceFields1704902661953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_balances_view"`);
    await queryRunner.query(
      `CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_balances_view"`);
    await queryRunner.query(
      `CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
      ],
    );
  }
}
