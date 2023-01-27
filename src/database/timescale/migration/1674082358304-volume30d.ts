import { MigrationInterface, QueryRunner } from 'typeorm';

export class volume30d1674082358304 implements MigrationInterface {
  name = 'volume30d1674082358304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE MATERIALIZED VIEW "volume30d" WITH (timescaledb.continuous) AS SELECT "collection", "currency", time_bucket(INTERVAL '30 days', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket" WITH NO DATA`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'MATERIALIZED_VIEW',
        'volume30d',
        'SELECT "collection", "currency", time_bucket(INTERVAL \'30 days\', "timestamp") AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "collection", "currency", "bucket"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['MATERIALIZED_VIEW', 'volume30d', 'public'],
    );
    await queryRunner.query(`DROP MATERIALIZED VIEW "volume30d"`);
  }
}