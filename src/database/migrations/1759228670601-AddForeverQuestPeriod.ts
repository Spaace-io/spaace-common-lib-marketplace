import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddForeverQuestPeriod1759228670601 implements MigrationInterface {
  name = 'AddForeverQuestPeriod1759228670601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."quest_period" ADD VALUE IF NOT EXISTS 'FOREVER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."quest_period" RENAME TO "quest_period_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quest_period" AS ENUM('DAILY', 'SEASONAL')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ALTER COLUMN "period" TYPE "public"."quest_period" USING "period"::text::"public"."quest_period"`,
    );
    await queryRunner.query(`DROP TYPE "public"."quest_period_old"`);
  }
}
