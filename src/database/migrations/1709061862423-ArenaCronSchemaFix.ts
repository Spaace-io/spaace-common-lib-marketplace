import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCronSchemaFix1709061862423 implements MigrationInterface {
  name = 'ArenaCronSchemaFix1709061862423';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crons" DROP COLUMN "lastProcessedTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crons" ADD "parameter" text array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crons" ADD "pointer" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_crons" DROP COLUMN "pointer"`);
    await queryRunner.query(
      `ALTER TABLE "arena_crons" DROP COLUMN "parameter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crons" ADD "lastProcessedTime" TIMESTAMP NOT NULL`,
    );
  }
}
