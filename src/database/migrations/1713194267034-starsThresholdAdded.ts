import { MigrationInterface, QueryRunner } from 'typeorm';

export class StarsThresholdAdded1713194267034 implements MigrationInterface {
  name = 'StarsThresholdAdded1713194267034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_period" ADD "starsThreshold" numeric(78) NOT NULL DEFAULT '0'`,
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
      `ALTER TABLE "arena_wow_chest_period" DROP COLUMN "starsThreshold"`,
    );
  }
}
