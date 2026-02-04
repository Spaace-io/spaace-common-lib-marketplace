import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReferralVolumeConfig1770206312525
  implements MigrationInterface
{
  name = 'AddReferralVolumeConfig1770206312525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epochs"
      ADD COLUMN IF NOT EXISTS "newUsersLookbackDays" integer NOT NULL DEFAULT 7;
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN IF NOT EXISTS "newUsersReferralTradingVolume" numeric(78) NOT NULL DEFAULT '0';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN IF EXISTS "newUsersReferralTradingVolume";
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epochs"
      DROP COLUMN IF EXISTS "newUsersLookbackDays";
    `);
  }
}
