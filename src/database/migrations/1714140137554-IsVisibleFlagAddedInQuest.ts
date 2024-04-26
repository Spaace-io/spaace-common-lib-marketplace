import { MigrationInterface, QueryRunner } from 'typeorm';

export class IsVisibleFlagAddedInQuest1714140137554
  implements MigrationInterface
{
  name = 'IsVisibleFlagAddedInQuest1714140137554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "isVisible" boolean NOT NULL DEFAULT true`,
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
      `ALTER TABLE "arena_quests" DROP COLUMN "isVisible"`,
    );
  }
}
