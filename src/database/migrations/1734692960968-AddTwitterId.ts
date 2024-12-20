import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTwitterId1734692960968 implements MigrationInterface {
  name = 'AddTwitterId1734692960968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "quests"
      ADD COLUMN "twitterId" text DEFAULT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "twitterId" text DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "twitterId"
    `);

    await queryRunner.query(`
      ALTER TABLE "quests"
      DROP COLUMN "twitterId"
    `);
  }
}
