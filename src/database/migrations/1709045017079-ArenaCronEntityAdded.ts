import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCronEntityAdded1709045017079 implements MigrationInterface {
  name = 'ArenaCronEntityAdded1709045017079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_crons" ("name" text NOT NULL, "lastProcessedTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_24a31d6a92279955be8832fe7ea" PRIMARY KEY ("name"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arena_crons"`);
  }
}
