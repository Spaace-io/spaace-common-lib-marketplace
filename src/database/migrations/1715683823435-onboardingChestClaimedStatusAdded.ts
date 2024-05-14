import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnboardingChestClaimedStatusAdded1715683823435
  implements MigrationInterface
{
  name = 'OnboardingChestClaimedStatusAdded1715683823435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "isOnboardingChestClaimed" boolean NOT NULL DEFAULT false`,
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
      `ALTER TABLE "arena_users" DROP COLUMN "isOnboardingChestClaimed"`,
    );
  }
}
