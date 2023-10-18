import { MigrationInterface, QueryRunner } from 'typeorm';

export class StakingDepositTokens1697647300851 implements MigrationInterface {
  name = 'StakingDepositTokens1697647300851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
      ],
    );
  }
}
