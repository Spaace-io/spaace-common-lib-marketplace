import { MigrationInterface, QueryRunner } from 'typeorm';

export class PassiveStaking1697713055289 implements MigrationInterface {
  name = 'PassiveStaking1697713055289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(`DROP TABLE "staking_rewards"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `CREATE TABLE "staking_harvests" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "pool" character(40) NOT NULL, "depositId" numeric(78) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4ad66b4ae348510c177b724b24f" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staking_type" AS ENUM('PASSIVE', 'ACTIVE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "type" "public"."staking_type" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "vestingTypeId" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "pool"`,
    );
    await queryRunner.query(`DROP TYPE "public"."staking_pool"`);
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "pool" character(40) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c53bae28da13037f9a0b91ea2d" ON "staking_deposits" ("type") `,
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "active_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'ACTIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'ACTIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "passive_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'PASSIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'passive_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'PASSIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_harvests_view" AS SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_harvests_view',
        'SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_harvests_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_harvests_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'passive_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "passive_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c53bae28da13037f9a0b91ea2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" TYPE numeric(78,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "pool"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staking_pool" AS ENUM('STANDARD_STAKING', 'COMPOUND_STAKING')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" ADD "pool" "public"."staking_pool" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "vestingTypeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_deposits" DROP COLUMN "type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."staking_type"`);
    await queryRunner.query(`DROP TABLE "staking_harvests"`);
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE TABLE "staking_rewards" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_851c6379084b24f40772bedcc0f" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"',
      ],
    );
  }
}
