import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuoteAndReplyAddedInArenaTweet1712055729212
  implements MigrationInterface
{
  name = 'QuoteAndReplyAddedInArenaTweet1712055729212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD "quoteTweetId" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" ADD "replyTweetId" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" DROP COLUMN "replyTweetId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_tweet" DROP COLUMN "quoteTweetId"`,
    );
  }
}
