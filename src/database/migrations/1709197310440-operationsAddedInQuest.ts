import { MigrationInterface, QueryRunner } from 'typeorm';

export class OperationsAddedInQuest1709197310440 implements MigrationInterface {
  name = 'OperationsAddedInQuest1709197310440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "operations" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "operations"`,
    );
  }
}
