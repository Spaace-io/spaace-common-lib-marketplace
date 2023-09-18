import { MigrationInterface, QueryRunner } from 'typeorm';

export class tableNames1689600180092 implements MigrationInterface {
  name = 'tableNames1689600180092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_nonce" RENAME TO "login_nonces"`,
    );
    await queryRunner.query(`ALTER TABLE "season" RENAME TO "seasons"`);
    await queryRunner.query(
      `ALTER TABLE "season_rank" RENAME TO "season_ranks"`,
    );
    await queryRunner.query(`ALTER TABLE "quest" RENAME TO "quests"`);
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" RENAME TO "user_season_rank_claims"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyRewards" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loyaltyRewardsClaimed" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "loyaltyRewardsClaimed"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewards"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyPoints"`);
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claims" RENAME TO "user_season_rank_claim"`,
    );
    await queryRunner.query(`ALTER TABLE "quests" RENAME TO "quest"`);
    await queryRunner.query(
      `ALTER TABLE "season_ranks" RENAME TO "season_rank"`,
    );
    await queryRunner.query(`ALTER TABLE "seasons" RENAME TO "season"`);
    await queryRunner.query(
      `ALTER TABLE "login_nonces" RENAME TO "login_nonce"`,
    );
  }
}
