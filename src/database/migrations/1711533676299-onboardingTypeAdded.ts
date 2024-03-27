import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnboardingTypeAdded1711533676299 implements MigrationInterface {
  name = 'OnboardingTypeAdded1711533676299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "onboardingPost" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "onboardingPost"`,
    );
  }
}
