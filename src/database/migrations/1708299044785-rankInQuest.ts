import { MigrationInterface, QueryRunner } from 'typeorm';

export class RankInQuest1708299044785 implements MigrationInterface {
  name = 'RankInQuest1708299044785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."loyalty_rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "quests" ADD "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "rank"`);
    await queryRunner.query(`DROP TYPE "public"."loyalty_rank"`);
  }
}
