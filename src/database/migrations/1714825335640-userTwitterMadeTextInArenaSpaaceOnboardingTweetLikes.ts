import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640
  implements MigrationInterface
{
  name = 'UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466"`,
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
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
