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
exports.QuestTypeAndTwitterMetrics1709320961201 = void 0;
class QuestTypeAndTwitterMetrics1709320961201 {
    constructor() {
        this.name = 'QuestTypeAndTwitterMetrics1709320961201';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "prime" TO "type"`);
            yield queryRunner.query(`CREATE TABLE "arena_twitter_metrics" ("tweetId" text NOT NULL, "likePaginationToken" text NOT NULL, "replyPaginationToken" text NOT NULL, "quotePaginationToken" text NOT NULL, "retweetPaginationToken" text NOT NULL, CONSTRAINT "PK_85fe429762894ee7718b60f745d" PRIMARY KEY ("tweetId"))`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "type"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "type" "public"."arena_quest_type" NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "type"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "type" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`DROP TABLE "arena_twitter_metrics"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "type" TO "prime"`);
        });
    }
}
exports.QuestTypeAndTwitterMetrics1709320961201 = QuestTypeAndTwitterMetrics1709320961201;
//# sourceMappingURL=1709320961201-QuestTypeAndTwitterMetrics.js.map