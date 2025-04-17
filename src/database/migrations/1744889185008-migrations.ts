import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1744889185008 implements MigrationInterface {
  name = 'Migrations1744889185008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_xp_log_source" AS ENUM('QUEST', 'REFERRAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_xp_log" ("id" SERIAL NOT NULL, "userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "source" "public"."user_xp_log_source" NOT NULL, "metadata" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "xp" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_5dd811b6a094da7a177f8bf5c2a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ee91131973231e298882b5c239" ON "user_xp_log" ("userAddress", "seasonNumber", "questId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_40f355303420080acce90be1551" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_cc55dfd5c72db7a23f350a43656" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ADD CONSTRAINT "FK_a78b252b596a7af68193acf488e" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_a78b252b596a7af68193acf488e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_cc55dfd5c72db7a23f350a43656"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" DROP CONSTRAINT "FK_40f355303420080acce90be1551"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee91131973231e298882b5c239"`,
    );
    await queryRunner.query(`DROP TABLE "user_xp_log"`);
    await queryRunner.query(`DROP TYPE "public"."user_xp_log_source"`);
  }
}
