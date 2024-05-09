import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209
  implements MigrationInterface
{
  name = 'IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4" PRIMARY KEY ("userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_31d3af91969ca277c4467ed19e3" PRIMARY KEY ("id")`,
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
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_31d3af91969ca277c4467ed19e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4" PRIMARY KEY ("userTwitter", "id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466" PRIMARY KEY ("userTwitter")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP COLUMN "id"`,
    );
  }
}
