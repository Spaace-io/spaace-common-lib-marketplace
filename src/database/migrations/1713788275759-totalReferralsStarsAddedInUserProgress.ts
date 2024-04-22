import { MigrationInterface, QueryRunner } from 'typeorm';

export class TotalReferralsStarsAddedInUserProgress1713788275759
  implements MigrationInterface
{
  name = 'TotalReferralsStarsAddedInUserProgress1713788275759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "totalReferralStars" numeric(78) NOT NULL DEFAULT '0'`,
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
      `ALTER TABLE "arena_users_progress" DROP COLUMN "totalReferralStars"`,
    );
  }
}
