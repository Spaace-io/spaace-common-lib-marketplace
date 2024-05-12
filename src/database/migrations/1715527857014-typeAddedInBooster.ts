import { MigrationInterface, QueryRunner } from 'typeorm';

export class TypeAddedInBooster1715527857014 implements MigrationInterface {
  name = 'TypeAddedInBooster1715527857014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."booster_type" AS ENUM('SPECIAL', 'WOW_CHEST')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD "type" "public"."booster_type" NOT NULL`,
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
      `ALTER TABLE "arena_users_booster" DROP COLUMN "type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."booster_type"`);
  }
}
