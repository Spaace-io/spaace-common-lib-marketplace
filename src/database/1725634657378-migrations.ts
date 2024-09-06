import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1725634657378 implements MigrationInterface {
  name = 'Migrations1725634657378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "rank"`);
    await queryRunner.query(`DROP TYPE "public"."rank"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."rank" AS ENUM('BRONZE_1', 'BRONZE_2', 'BRONZE_3', 'BRONZE_4', 'BRONZE_5', 'DIAMOND_1', 'DIAMOND_2', 'DIAMOND_3', 'DIAMOND_4', 'DIAMOND_5', 'GOLD_1', 'GOLD_2', 'GOLD_3', 'GOLD_4', 'GOLD_5', 'PLATINUM_1', 'PLATINUM_2', 'PLATINUM_3', 'PLATINUM_4', 'PLATINUM_5', 'SILVER_1', 'SILVER_2', 'SILVER_3', 'SILVER_4', 'SILVER_5')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_loyalties" ADD "rank" "public"."rank" NOT NULL`,
    );
  }
}
