import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixAmbassadorScores1769853880282 implements MigrationInterface {
  name = 'FixAmbassadorScores1769853880282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "ambassador_epoch_leaderboard"
        DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      `);

    await queryRunner.query(`
        ALTER TABLE "ambassador_epoch_leaderboard"
        ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_non_negative"
        CHECK ("socialScore" IS NULL OR "socialScore" >= 0)
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_non_negative"
    `);

    await queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      CHECK ("socialScore" IS NULL OR ("socialScore" >= 0 AND "socialScore" <= 100))
    `);
  }
}
