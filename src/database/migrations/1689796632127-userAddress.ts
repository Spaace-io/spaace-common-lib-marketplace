import { MigrationInterface, QueryRunner } from 'typeorm';

export class userAddress1689796632127 implements MigrationInterface {
  name = 'userAddress1689796632127';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "trading_rewards" RENAME COLUMN "user" TO "userAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trading_rewards" RENAME CONSTRAINT "PK_22e029b4e8363c42bc28c1f1ff0" TO "PK_afc958bd5194d51375325441597"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral_rewards" RENAME COLUMN "user" TO "userAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral_rewards" RENAME CONSTRAINT "PK_15332389aaa619369deaf7358cf" TO "PK_747a45a7f86106e2925a99113da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" RENAME COLUMN "user" TO "userAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" RENAME CONSTRAINT "PK_edac7a4e681cb67e0d302ed4903" TO "PK_41126261e9a22d2405c6ebde644"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "user" TO "userAddress"`,
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" != '0000000000000000000000000000000000000000'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'balances',
        'SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" != \'0000000000000000000000000000000000000000\'',
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
      `CREATE INDEX "IDX_737f403a0dc0349952989dff4b" ON "balances" ("collectionAddress", "tokenId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_737f403a0dc0349952989dff4b"`,
    );
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
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'balances', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "userAddress" TO "user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" RENAME CONSTRAINT "PK_41126261e9a22d2405c6ebde644" TO "PK_edac7a4e681cb67e0d302ed4903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" RENAME COLUMN "userAddress" TO "user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral_rewards" RENAME CONSTRAINT "PK_747a45a7f86106e2925a99113da" TO "PK_15332389aaa619369deaf7358cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "referral_rewards" RENAME COLUMN "userAddress" TO "user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trading_rewards" RENAME CONSTRAINT "PK_afc958bd5194d51375325441597" TO "PK_22e029b4e8363c42bc28c1f1ff0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trading_rewards" RENAME COLUMN "userAddress" TO "user"`,
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "buy_volumes" AS SELECT "to" AS "user", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'buy_volumes',
        'SELECT "to" AS "user", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"',
      ],
    );
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "sell_volumes" AS SELECT "from" AS "user", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'sell_volumes',
        'SELECT "from" AS "user", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"',
      ],
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
}
