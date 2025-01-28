import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTweetActionToQuests1734700380878 implements MigrationInterface {
  name = 'AddTweetActionToQuests1734700380878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "tweet_action_enum" AS ENUM ('LIKE', 'REPLY', 'REPOST')`,
    );

    await queryRunner.query(
      `ALTER TABLE "quests" ADD "tweetAction" "tweet_action_enum" DEFAULT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetAction"`);

    await queryRunner.query(`DROP TYPE "tweet_action_enum"`);
  }
}
