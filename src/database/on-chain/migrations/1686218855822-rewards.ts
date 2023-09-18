import { MigrationInterface, QueryRunner } from 'typeorm';

export class rewards1686218855822 implements MigrationInterface {
  name = 'rewards1686218855822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "trading_rewards" ("user" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "buyAmount" numeric(78) NOT NULL, "sellAmount" numeric(78) NOT NULL, CONSTRAINT "PK_22e029b4e8363c42bc28c1f1ff0" PRIMARY KEY ("user", "date"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "referral_rewards" ("user" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "referrer" character(40) NOT NULL, "referrerAmount" numeric(78) NOT NULL, "referredAmount" numeric(78) NOT NULL, CONSTRAINT "PK_15332389aaa619369deaf7358cf" PRIMARY KEY ("user", "date", "referrer"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staking_deposits" ("user" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_edac7a4e681cb67e0d302ed4903" PRIMARY KEY ("user", "timestamp"))`,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
    await queryRunner.query(`DROP TABLE "staking_deposits"`);
    await queryRunner.query(`DROP TABLE "referral_rewards"`);
    await queryRunner.query(`DROP TABLE "trading_rewards"`);
  }
}
