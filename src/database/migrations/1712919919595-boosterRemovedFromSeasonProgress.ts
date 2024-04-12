import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoosterRemovedFromSeasonProgress1712919919595
  implements MigrationInterface
{
  name = 'BoosterRemovedFromSeasonProgress1712919919595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP COLUMN "booster"`,
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
      `ALTER TABLE "arena_users_progress" ADD "booster" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
  }
}
