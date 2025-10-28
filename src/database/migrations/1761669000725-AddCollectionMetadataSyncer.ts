import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1761669000725 implements MigrationInterface {
  name = 'Migrations1761669000725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "collection_metadata_syncer" (
        "address" CHAR(40) PRIMARY KEY,
        "visited" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "proceed" BOOLEAN NOT NULL DEFAULT false
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_collection_metadata_syncer_proceed" 
      ON "collection_metadata_syncer" ("proceed")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_collection_metadata_syncer_visited" 
      ON "collection_metadata_syncer" ("visited")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "collection_metadata_syncer"`);
  }
}

