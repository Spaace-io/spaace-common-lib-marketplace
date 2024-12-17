import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompletedAtTOUserQuestProgress1734428507472
  implements MigrationInterface
{
  name = 'AddCompletedAtTOUserQuestProgress1734428507472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "completedAt" TIMESTAMP NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "completedAt"
    `);
  }
}
