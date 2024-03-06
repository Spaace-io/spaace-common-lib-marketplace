import { MigrationInterface, QueryRunner } from 'typeorm';

export class TweetEntityAdded1709726555013 implements MigrationInterface {
  name = 'TweetEntityAdded1709726555013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_tweet" ("id" text NOT NULL, "authorId" text NOT NULL, "text" text NOT NULL, "likeCount" numeric(78) NOT NULL DEFAULT '0', "replyCount" numeric(78) NOT NULL DEFAULT '0', "retweetCount" numeric(78) NOT NULL DEFAULT '0', "viewCount" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_137bbd977cd59a0256a50ff5689" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arena_tweet"`);
  }
}
