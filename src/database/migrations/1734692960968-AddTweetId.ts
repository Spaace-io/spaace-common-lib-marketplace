import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTweetId1734692960968 implements MigrationInterface {
  name = 'AddTweetId1734692960968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "quests"
      ADD COLUMN "tweetId" text DEFAULT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      ADD COLUMN "tweetId" text DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_quest_progress"
      DROP COLUMN "tweetId"
    `);

    await queryRunner.query(`
      ALTER TABLE "quests"
      DROP COLUMN "tweetId"
    `);
  }
}
