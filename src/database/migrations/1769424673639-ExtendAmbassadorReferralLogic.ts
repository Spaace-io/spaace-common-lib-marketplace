import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendAmbassadorReferralLogic1769424673639
  implements MigrationInterface
{
  name = 'ExtendAmbassadorReferralLogic1769424673639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "referralActivatedAt" timestamp without time zone NULL
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "users_referrer_activated_at_idx"
      ON "users" ("referrerAddress", "referralActivatedAt")
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN IF NOT EXISTS "newActiveReferralsCount" int NOT NULL DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN IF EXISTS "newActiveReferralsCount"
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "users_referrer_activated_at_idx"
    `);

    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "referralActivatedAt"
    `);
  }
}
