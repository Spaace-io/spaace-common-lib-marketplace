import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestTypeAndTwitterMetrics1709320961201
  implements MigrationInterface
{
  name = 'QuestTypeAndTwitterMetrics1709320961201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "prime" TO "type"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_twitter_metrics" ("tweetId" text NOT NULL, "likePaginationToken" text NOT NULL, "replyPaginationToken" text NOT NULL, "quotePaginationToken" text NOT NULL, "retweetPaginationToken" text NOT NULL, CONSTRAINT "PK_85fe429762894ee7718b60f745d" PRIMARY KEY ("tweetId"))`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "type" "public"."arena_quest_type" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "type" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`DROP TABLE "arena_twitter_metrics"`);
    await queryRunner.query(
      `ALTER TABLE "arena_quests" RENAME COLUMN "type" TO "prime"`,
    );
  }
}
