import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderHashToUserQuestProgress1733429925790
  implements MigrationInterface
{
  name = 'AddOrderHashToUserQuestProgress1733429925790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_quest_progress"
            ADD COLUMN "orderHash" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_quest_progress"
            DROP COLUMN "orderHash"
        `);
  }
}
