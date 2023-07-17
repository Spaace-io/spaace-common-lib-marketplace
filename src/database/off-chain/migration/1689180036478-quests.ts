import { MigrationInterface, QueryRunner } from 'typeorm';

export class quests1689180036478 implements MigrationInterface {
  name = 'quests1689180036478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "season" ("number" numeric(78) NOT NULL, "startDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP, CONSTRAINT "PK_e486e298a7648e3e6a0a5b5e7cc" PRIMARY KEY ("number"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."rank" AS ENUM('bronze5', 'bronze4', 'bronze3', 'bronze2', 'bronze1', 'silver5', 'silver4', 'silver3', 'silver2', 'silver1', 'gold5', 'gold4', 'gold3', 'gold2', 'gold1', 'platinum5', 'platinum4', 'platinum3', 'platinum2', 'platinum1', 'diamond5', 'diamond4', 'diamond3', 'diamond2', 'diamond1')`,
    );
    await queryRunner.query(
      `CREATE TABLE "season_rank" ("seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "threshold" numeric(78) NOT NULL, "rewards" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_19c434ff8bd7e47e9a4f3c9c806" PRIMARY KEY ("seasonNumber", "rank"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."quest_period" AS ENUM('day', 'season')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "seasonNumber" numeric(78) NOT NULL, "name" text NOT NULL, "steps" jsonb NOT NULL DEFAULT '[]', "rewards" jsonb NOT NULL DEFAULT '[]', "limit" numeric(78), "period" "public"."quest_period" NOT NULL, CONSTRAINT "PK_0d6873502a58302d2ae0b82631c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_rank" ADD CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1" FOREIGN KEY ("seasonNumber") REFERENCES "season"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quest" ADD CONSTRAINT "FK_8e507c23ab7f443020bd75a072c" FOREIGN KEY ("seasonNumber") REFERENCES "season"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quest" DROP CONSTRAINT "FK_8e507c23ab7f443020bd75a072c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "season_rank" DROP CONSTRAINT "FK_922d92212ab5e456b7c4cd659b1"`,
    );
    await queryRunner.query(`DROP TABLE "quest"`);
    await queryRunner.query(`DROP TYPE "public"."quest_period"`);
    await queryRunner.query(`DROP TABLE "season_rank"`);
    await queryRunner.query(`DROP TYPE "public"."rank"`);
    await queryRunner.query(`DROP TABLE "season"`);
  }
}
