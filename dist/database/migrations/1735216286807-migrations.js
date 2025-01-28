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
exports.Migrations1735216286807 = void 0;
class Migrations1735216286807 {
    constructor() {
        this.name = 'Migrations1735216286807';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "twitterUsername" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "twitterId" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "twitterSecretToken" text`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "twitterAccessToken" text`);
            yield queryRunner.query(`CREATE TYPE "public"."quest_type" AS ENUM('GENESIS', 'PRIME', 'DAILY', 'PROGRESSIVE')`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "questType" "public"."quest_type" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "featured" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "tweetId" text`);
            yield queryRunner.query(`CREATE TYPE "public"."tweet_action" AS ENUM('LIKE', 'REPLY', 'REPOST')`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "tweetAction" "public"."tweet_action"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD "boostMultiplier" numeric(78,2) NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "orderHash" text`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "completedAt" TIMESTAMP`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "tweetId" text`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "boostMultiplier" numeric(78,2) NOT NULL DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "points" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "points"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "boostMultiplier"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "tweetId"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "completedAt"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "orderHash"`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "boostMultiplier"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetAction"`);
            yield queryRunner.query(`DROP TYPE "public"."tweet_action"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "tweetId"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "featured"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "questType"`);
            yield queryRunner.query(`DROP TYPE "public"."quest_type"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitterAccessToken"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitterSecretToken"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitterId"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "twitterUsername"`);
        });
    }
}
exports.Migrations1735216286807 = Migrations1735216286807;
//# sourceMappingURL=1735216286807-migrations.js.map