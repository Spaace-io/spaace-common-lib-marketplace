import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaSpaaceTweetEntityAdded1709807735187
  implements MigrationInterface
{
  name = 'ArenaSpaaceTweetEntityAdded1709807735187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_spaace_tweet" ("tweetId" text NOT NULL, "likePaginationToken" text NOT NULL, "replyPaginationToken" text NOT NULL, "quotePaginationToken" text NOT NULL, "retweetPaginationToken" text NOT NULL, "postOfTheDay" boolean NOT NULL DEFAULT false, "primePost" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arena_spaace_tweet"`);
  }
}
