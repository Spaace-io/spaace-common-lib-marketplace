import { MigrationInterface, QueryRunner } from 'typeorm';

export class Views1695035411468 implements MigrationInterface {
  name = 'Views1695035411468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward".* FROM "distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward".* FROM "distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT "item".* FROM "items" "item"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      ['public', 'VIEW', 'items_view', 'SELECT "item".* FROM "items" "item"'],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute".* FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute".* FROM "item_attributes" "attribute"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order".* FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order".* FROM "orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period".* FROM "reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period".* FROM "reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale".* FROM "sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      ['public', 'VIEW', 'sales_view', 'SELECT "sale".* FROM "sales" "sale"'],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit".* FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit".* FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward".* FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward".* FROM "staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer".* FROM "token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer".* FROM "token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer".* FROM "transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer".* FROM "transfers" "transfer"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
  }
}
