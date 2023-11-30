import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestCountAndData1701278042281 implements MigrationInterface {
  name = 'AddQuestCountAndData1701278042281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" RENAME COLUMN "currentStep" TO "data"`,
    );
    await queryRunner.query(`ALTER TABLE "quests" ADD "count" numeric(78)`);
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "data"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "data" jsonb NOT NULL DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "data"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "data" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "count"`);
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" RENAME COLUMN "data" TO "currentStep"`,
    );
  }
}
