import { MigrationInterface, QueryRunner } from 'typeorm';

export class CronParameterSeperatedInCron1709209796750
  implements MigrationInterface
{
  name = 'CronParameterSeperatedInCron1709209796750';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "cronName" text`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "cronParameter" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "cronParameter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" DROP COLUMN "cronName"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" jsonb`);
  }
}
