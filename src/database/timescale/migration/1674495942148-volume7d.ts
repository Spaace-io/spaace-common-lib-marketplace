import { MigrationInterface, QueryRunner } from 'typeorm';

export class volume7d1674495942148 implements MigrationInterface {
  name = 'volume7d1674495942148';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'volume7d', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "volume7d"`);
    await queryRunner.query(
      `CREATE VIEW "volume7d" AS SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (7 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL '14 days' GROUP BY "collection", "currency", "bucket"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'volume7d',
        'SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (7 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL \'14 days\' GROUP BY "collection", "currency", "bucket"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'volume7d', 'public'],
    );
    await queryRunner.query(`DROP VIEW "volume7d"`);
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "volume7d" WITH (timescaledb.continuous) AS SELECT "collection", "currency", time_bucket(INTERVAL '7 days', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket" WITH NO DATA`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'volume7d',
        'SELECT "collection", "currency", time_bucket(INTERVAL \'7 days\', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket"',
      ],
    );
  }
}
