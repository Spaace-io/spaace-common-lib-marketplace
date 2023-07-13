import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserQuests1689251634807 implements MigrationInterface {
  name = 'UserQuests1689251634807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quest" RENAME COLUMN "rewards" TO "loyaltyPoints"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" DROP CONSTRAINT "PK_0d6873502a58302d2ae0b82631c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD CONSTRAINT "PK_b4c017e2f9c24d116b7e2c151c0" PRIMARY KEY ("seasonNumber", "id")`,
    );
    await queryRunner.query(`ALTER TYPE "public"."rank" RENAME TO "rank_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."rank" AS ENUM('B5', 'B4', 'B3', 'B2', 'B1', 'S5', 'S4', 'S3', 'S2', 'S1', 'G5', 'G4', 'G3', 'G2', 'G1', 'P5', 'P4', 'P3', 'P2', 'P1', 'D5', 'D4', 'D3', 'D2', 'D1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_rank" ALTER COLUMN "rank" TYPE "public"."rank" USING "rank"::"text"::"public"."rank"`,
    );
    await queryRunner.query(`DROP TYPE "public"."rank_old"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "loyaltyPoints"`);
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "loyaltyPoints" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_quest_progress" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "completed" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_1113118dfa3e1f35571ceebbd68" PRIMARY KEY ("userAddress", "seasonNumber", "questId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_season_rank_claim" ("userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_31bc12f072c7b12d412cd57be2e" PRIMARY KEY ("userAddress", "seasonNumber", "rank"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "season"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quest"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" ADD CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" ADD CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1" FOREIGN KEY ("seasonNumber") REFERENCES "season"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" ADD CONSTRAINT "FK_ac8319fc70ddd862d6476100b57" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_rank"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" DROP CONSTRAINT "FK_ac8319fc70ddd862d6476100b57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" DROP CONSTRAINT "FK_e09c02f2ccf045e5fe377e617a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_season_rank_claim" DROP CONSTRAINT "FK_97e711cec61f29f3fdf1a82e60a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_6d45b7fa23f8b41b22b3e02b1cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_7a15f9a88d7509a5b0af5efa149"`,
    );
    await queryRunner.query(`DROP TABLE "user_season_rank_claim"`);
    await queryRunner.query(`DROP TABLE "user_quest_progress"`);
    await queryRunner.query(`ALTER TABLE "quest" DROP COLUMN "loyaltyPoints"`);
    await queryRunner.query(
      `ALTER TABLE "quest" ADD "loyaltyPoints" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."rank_old" AS ENUM('bronze5', 'bronze4', 'bronze3', 'bronze2', 'bronze1', 'silver5', 'silver4', 'silver3', 'silver2', 'silver1', 'gold5', 'gold4', 'gold3', 'gold2', 'gold1', 'platinum5', 'platinum4', 'platinum3', 'platinum2', 'platinum1', 'diamond5', 'diamond4', 'diamond3', 'diamond2', 'diamond1')`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_rank" ALTER COLUMN "rank" TYPE "public"."rank_old" USING "rank"::"text"::"public"."rank_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."rank"`);
    await queryRunner.query(`ALTER TYPE "public"."rank_old" RENAME TO "rank"`);
    await queryRunner.query(
      `ALTER TABLE "quest" DROP CONSTRAINT "PK_b4c017e2f9c24d116b7e2c151c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" RENAME COLUMN "loyaltyPoints" TO "rewards"`,
    );
  }
}
