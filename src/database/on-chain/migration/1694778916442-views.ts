import { MigrationInterface, QueryRunner } from 'typeorm';

export class Views1694778916442 implements MigrationInterface {
  name = 'Views1694778916442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'token_balances', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "token_balances"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'balances', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'sell_volumes', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "sell_volumes"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'buy_volumes', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "buy_volumes"`);
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'balances',
        'SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "buy_volumes" AS SELECT "to" AS "userAddress", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'buy_volumes',
        'SELECT "to" AS "userAddress", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "sell_volumes" AS SELECT "from" AS "userAddress", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'sell_volumes',
        'SELECT "from" AS "userAddress", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "token_balances" AS SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'token_balances',
        'SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
      ],
    );
  }
}
