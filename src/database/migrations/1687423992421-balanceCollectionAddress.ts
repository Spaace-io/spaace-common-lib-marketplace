import { MigrationInterface, QueryRunner } from 'typeorm';

export class balanceCollectionAddress1687423992421
  implements MigrationInterface
{
  name = 'balanceCollectionAddress1687423992421';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'balances', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_0b89981208a5ea032d8daed1bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ("pk" = TRUE)`,
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'balances',
        'SELECT "received"."collectionAddress", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != \'0000000000000000000000000000000000000000\'',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'balances', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
    await queryRunner.query(
      `ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_0b89981208a5ea032d8daed1bc" CHECK ((pk = true))`,
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "received" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "sent" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'balances',
        'SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "received" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "sent" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != \'0000000000000000000000000000000000000000\'',
      ],
    );
  }
}
