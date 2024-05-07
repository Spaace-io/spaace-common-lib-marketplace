import { MigrationInterface, QueryRunner } from 'typeorm';

export class ActionTypeAdded1715095430601 implements MigrationInterface {
  name = 'ActionTypeAdded1715095430601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD "actionType" text NOT NULL`,
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
      `ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP COLUMN "actionType"`,
    );
  }
}
