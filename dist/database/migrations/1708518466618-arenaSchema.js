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
exports.ArenaSchema1708518466618 = void 0;
class ArenaSchema1708518466618 {
    constructor() {
        this.name = 'ArenaSchema1708518466618';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_seasons" ("number" numeric(78) NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP, CONSTRAINT "PK_391e31fcb27b18dc62cba155555" PRIMARY KEY ("number"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_d4472d06a5fac99cd2361b28cc" ON "arena_seasons" ("startTime") `);
            yield queryRunner.query(`CREATE TABLE "arena_users_progress" ("userTwitter" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "points" numeric(78) NOT NULL DEFAULT '0', "questCompleted" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_8401b8efb920856c9907965ee07" PRIMARY KEY ("userTwitter", "seasonNumber"))`);
            yield queryRunner.query(`CREATE TABLE "arena_divisions" ("divisionName" text NOT NULL, "seasonNumber" numeric NOT NULL, "leagueUsersMaxCap" integer NOT NULL, CONSTRAINT "PK_ed874545e9614cca8017aa84789" PRIMARY KEY ("divisionName"))`);
            yield queryRunner.query(`CREATE TABLE "arena_leagues" ("leagueNumber" integer NOT NULL, "numberOfUsers" integer NOT NULL, "divisionNumber" text NOT NULL, "seasonNumber" numeric NOT NULL, CONSTRAINT "PK_38abc11e26dcaddbe8c3eff3654" PRIMARY KEY ("leagueNumber"))`);
            yield queryRunner.query(`CREATE TABLE "arena-quests" ("seasonNumber" numeric(78) NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "previousQuestId" uuid, "count" numeric(78) NOT NULL, "prime" boolean NOT NULL DEFAULT false, "steps" jsonb NOT NULL DEFAULT '[]', "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0', "boost" numeric(78) NOT NULL DEFAULT '0', "boostLimit" numeric(78), "limit" numeric(78) NOT NULL DEFAULT '1', "period" "public"."quest_period" NOT NULL, "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5', CONSTRAINT "UQ_8121786d0b0e266659764f970e8" UNIQUE ("seasonNumber", "name"), CONSTRAINT "REL_2d6403a1973bdf685cb0556d1e" UNIQUE ("seasonNumber", "previousQuestId"), CONSTRAINT "PK_dd2f1d886295d0aa351120925de" PRIMARY KEY ("seasonNumber", "id"))`);
            yield queryRunner.query(`CREATE TABLE "arena_quest_progress" ("twitterName" text NOT NULL, "seasonNumber" numeric(78) NOT NULL, "questId" uuid NOT NULL, "nonce" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb NOT NULL, "completed" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f29328d4c75ca9622bb34ebb272" PRIMARY KEY ("twitterName", "seasonNumber", "questId", "nonce"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_b8447028384b073e6bd7b7d006" ON "arena_quest_progress" ("twitterName", "seasonNumber", "questId") WHERE "completed"`);
            yield queryRunner.query(`CREATE TABLE "arena_user_statistics" ("twitterUsername" text NOT NULL, "totalLikes" integer NOT NULL, "totalReposts" integer NOT NULL, CONSTRAINT "PK_a99b50f2543fb5cab0511c5c4e5" PRIMARY KEY ("twitterUsername"))`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "loyatyPointsEarned" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "totalStarsEarned" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "level" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "dailyStreak" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "lastActive" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_20c10956cb163d953e1481757fa" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "FK_7c72d748bbe2d7f65a5ba78ff83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" ADD CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17" FOREIGN KEY ("divisionNumber") REFERENCES "arena_divisions"("divisionName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" ADD CONSTRAINT "FK_eeab1d978b265c55f80967bea83" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena-quests" ADD CONSTRAINT "FK_a1d6fa5d44e47e98751677c7c47" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena-quests" ADD CONSTRAINT "FK_2d6403a1973bdf685cb0556d1e5" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "arena-quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_d641a417a7c5f296d3146026c9f" FOREIGN KEY ("twitterName") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_834299fbb41bacf21b118c79613" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd" FOREIGN KEY ("seasonNumber", "questId") REFERENCES "arena-quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5" FOREIGN KEY ("twitterUsername") REFERENCES "arena_users"("twitterUsername") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_48788217a8a93cdd53d0dd730dd"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_834299fbb41bacf21b118c79613"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_d641a417a7c5f296d3146026c9f"`);
            yield queryRunner.query(`ALTER TABLE "arena-quests" DROP CONSTRAINT "FK_2d6403a1973bdf685cb0556d1e5"`);
            yield queryRunner.query(`ALTER TABLE "arena-quests" DROP CONSTRAINT "FK_a1d6fa5d44e47e98751677c7c47"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_eeab1d978b265c55f80967bea83"`);
            yield queryRunner.query(`ALTER TABLE "arena_leagues" DROP CONSTRAINT "FK_fe0cd75f62e95ad796699a28b17"`);
            yield queryRunner.query(`ALTER TABLE "arena_divisions" DROP CONSTRAINT "FK_14d78d3a09b381e9ca08a2a30fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_7c72d748bbe2d7f65a5ba78ff83"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "FK_20c10956cb163d953e1481757fa"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "lastActive"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "dailyStreak"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "level"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "totalStarsEarned"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "loyatyPointsEarned"`);
            yield queryRunner.query(`DROP TABLE "arena_user_statistics"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_b8447028384b073e6bd7b7d006"`);
            yield queryRunner.query(`DROP TABLE "arena_quest_progress"`);
            yield queryRunner.query(`DROP TABLE "arena-quests"`);
            yield queryRunner.query(`DROP TABLE "arena_leagues"`);
            yield queryRunner.query(`DROP TABLE "arena_divisions"`);
            yield queryRunner.query(`DROP TABLE "arena_users_progress"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d4472d06a5fac99cd2361b28cc"`);
            yield queryRunner.query(`DROP TABLE "arena_seasons"`);
        });
    }
}
exports.ArenaSchema1708518466618 = ArenaSchema1708518466618;
//# sourceMappingURL=1708518466618-arenaSchema.js.map