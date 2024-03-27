import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpaaceOnboardingTweetLikesAdded1711540972454
  implements MigrationInterface
{
  name = 'SpaaceOnboardingTweetLikesAdded1711540972454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_spaace_onboarding_tweet_likes" ("tweetId" text NOT NULL, "userTwitter" text NOT NULL, CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b" PRIMARY KEY ("tweetId", "userTwitter"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "userTwitter" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b" PRIMARY KEY ("tweetId", "userTwitter")`,
    );
    await queryRunner.query(`DROP TABLE "arena_spaace_onboarding_tweet_likes"`);
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
