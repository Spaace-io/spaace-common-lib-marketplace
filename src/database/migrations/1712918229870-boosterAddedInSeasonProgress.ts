import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoosterAddedInSeasonProgress1712918229870
  implements MigrationInterface
{
  name = 'BoosterAddedInSeasonProgress1712918229870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD "booster" numeric(78) NOT NULL DEFAULT '0'`,
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
      `ALTER TABLE "arena_users_progress" DROP COLUMN "booster"`,
    );
  }
}
