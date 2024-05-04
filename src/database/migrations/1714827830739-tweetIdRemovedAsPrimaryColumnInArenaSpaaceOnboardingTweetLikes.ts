import { MigrationInterface, QueryRunner } from 'typeorm';

export class TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739
  implements MigrationInterface
{
  name =
    'TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466" PRIMARY KEY ("userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b" PRIMARY KEY ("tweetId", "userTwitter")`,
    );
  }
}
