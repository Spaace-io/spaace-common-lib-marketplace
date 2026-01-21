import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSocialScoreAmbassadorEpoch1768994452361
  implements MigrationInterface
{
  name = 'AddSocialScoreAmbassadorEpoch1768994452361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN "socialScore" integer NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      CHECK ("socialScore" IS NULL OR ("socialScore" >= 0 AND "socialScore" <= 100))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_0_100"
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN "socialScore"
    `);
  }
}
