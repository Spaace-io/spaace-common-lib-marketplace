import { MigrationInterface, QueryRunner } from 'typeorm';

export class CronParameterAddedinCron1709209021892
  implements MigrationInterface
{
  name = 'CronParameterAddedinCron1709209021892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "cronName" TO "cron"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" text`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "cron" TO "cronName"`,
    );
  }
}
