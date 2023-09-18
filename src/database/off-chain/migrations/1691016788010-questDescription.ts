import { MigrationInterface, QueryRunner } from 'typeorm';

export class questDescription1691016788010 implements MigrationInterface {
  name = 'questDescription1691016788010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" RENAME COLUMN "progressCurrentStep" TO "currentStep"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP COLUMN "countForCurrentStep"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD "countForCurrentStep" numeric(78,0) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" RENAME COLUMN "currentStep" TO "progressCurrentStep"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep", "countForCurrentStep")`,
    );
    await queryRunner.query(`ALTER TABLE "quests" ADD "description" text`);
    await queryRunner.query(`UPDATE "quests" SET "description" = "name"`);
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
