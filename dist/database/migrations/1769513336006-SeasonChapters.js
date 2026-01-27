"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonChapters1769513336006 = void 0;
class SeasonChapters1769513336006 {
    constructor() {
        this.name = 'SeasonChapters1769513336006';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."season_chapter_key" AS ENUM('PRE_RESET', 'FINAL_CHAPTER', 'POST_FINAL_CHAPTER', 'MANUAL_RESET')`);
            yield queryRunner.query(`CREATE TABLE "season_chapters" (
      "id" SERIAL NOT NULL,
      "seasonNumber" numeric(78) NOT NULL,
      "name" text NOT NULL,
      "key" "public"."season_chapter_key" NOT NULL,
      "startAt" TIMESTAMP NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      CONSTRAINT "PK_79542940e6c3c1117a744579279" PRIMARY KEY ("id")
    )`);
            yield queryRunner.query(`ALTER TABLE "season_chapters"
     ADD CONSTRAINT "FK_season_chapters_season"
     FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number")
     ON DELETE RESTRICT ON UPDATE CASCADE`);
            yield queryRunner.query(`CREATE INDEX "IDX_season_chapters_season_start"
     ON "season_chapters" ("seasonNumber", "startAt")`);
            yield queryRunner.query(`CREATE INDEX "IDX_season_chapters_season_key_start"
     ON "season_chapters" ("seasonNumber", "key", "startAt")`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_season_chapters_season_name"
       ON "season_chapters" ("seasonNumber", "name")`);
            yield queryRunner.query(`CREATE TABLE "user_season_chapters_data" (
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
    )`);
            yield queryRunner.query(`CREATE INDEX "IDX_user_season_chapters_data_season_points"
     ON "user_season_chapters_data" ("seasonNumber", "points")`);
            yield queryRunner.query(`CREATE INDEX "IDX_user_season_chapters_data_season_chapter"
     ON "user_season_chapters_data" ("seasonNumber", "chapterId")`);
            yield queryRunner.query(`CREATE INDEX "IDX_user_season_chapters_data_user_season"
     ON "user_season_chapters_data" ("userAddress", "seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_user"
     FOREIGN KEY ("userAddress") REFERENCES "users"("address")
     ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_season"
     FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number")
     ON DELETE RESTRICT ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "user_season_chapters_data"
     ADD CONSTRAINT "FK_user_season_chapters_data_chapter"
     FOREIGN KEY ("chapterId") REFERENCES "season_chapters"("id")
     ON DELETE RESTRICT ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "user_season_chapters_data"`);
            yield queryRunner.query(`DROP TABLE "season_chapters"`);
            yield queryRunner.query(`DROP TYPE "public"."season_chapter_key"`);
        });
    }
}
exports.SeasonChapters1769513336006 = SeasonChapters1769513336006;
//# sourceMappingURL=1769513336006-SeasonChapters.js.map