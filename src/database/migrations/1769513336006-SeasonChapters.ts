import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonChapters1769513336006 implements MigrationInterface {
  name = 'SeasonChapters1769513336006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."season_chapter_key" AS ENUM('PRE_RESET', 'FINAL_CHAPTER', 'POST_FINAL_CHAPTER', 'MANUAL_RESET')`,
    );

    await queryRunner.query(
      `CREATE TABLE "season_chapters" (
      "id" SERIAL NOT NULL,
      "seasonNumber" numeric(78) NOT NULL,
      "name" text NOT NULL,
      "key" "public"."season_chapter_key" NOT NULL,
      "startAt" TIMESTAMP NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "PK_79542940e6c3c1117a744579279" PRIMARY KEY ("id")
    )`,
    );

    await queryRunner.query(
      `ALTER TABLE "season_chapters"
     ADD CONSTRAINT "FK_season_chapters_season"
     FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number")
     ON DELETE RESTRICT ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_season_chapters_season_start"
     ON "season_chapters" ("seasonNumber", "startAt")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_season_chapters_season_key_start"
     ON "season_chapters" ("seasonNumber", "key", "startAt")`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_season_chapters_season_name"
       ON "season_chapters" ("seasonNumber", "name")`,
    );

    await queryRunner.query(
      `CREATE TABLE "user_season_chapters_data" (
      "userAddress" character(40) NOT NULL,
      "seasonNumber" numeric(78) NOT NULL,
      "chapterId" integer NOT NULL,
      "snapshotAt" TIMESTAMP NOT NULL DEFAULT now(),
      "points" numeric(78) NOT NULL DEFAULT '0',
      "rank" "public"."rank" NOT NULL,
      "questCompleted" bigint NOT NULL DEFAULT '0',
      "discordTierFloor" "public"."discord_tier",
      CONSTRAINT "PK_48b9c83a81a23e6f7d206655264"
        PRIMARY KEY ("userAddress", "seasonNumber", "chapterId")
    )`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_user_season_chapters_data_season_points"
     ON "user_season_chapters_data" ("seasonNumber", "points")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_user_season_chapters_data_season_chapter"
     ON "user_season_chapters_data" ("seasonNumber", "chapterId")`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_user_season_chapters_data_user_season"
     ON "user_season_chapters_data" ("userAddress", "seasonNumber")`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_user"
     FOREIGN KEY ("userAddress") REFERENCES "users"("address")
     ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_season"
     FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number")
     ON DELETE RESTRICT ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_chapter"
     FOREIGN KEY ("chapterId") REFERENCES "season_chapters"("id")
     ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_season_chapters_data"`);
    await queryRunner.query(`DROP TABLE "season_chapters"`);
    await queryRunner.query(`DROP TYPE "public"."season_chapter_key"`);
  }
}
