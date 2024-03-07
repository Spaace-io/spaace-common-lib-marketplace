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
exports.ArenaSpaaceTweetEntityAdded1709807735187 = void 0;
class ArenaSpaaceTweetEntityAdded1709807735187 {
    constructor() {
        this.name = 'ArenaSpaaceTweetEntityAdded1709807735187';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_spaace_tweet" ("tweetId" text NOT NULL, "likePaginationToken" text NOT NULL, "replyPaginationToken" text NOT NULL, "quotePaginationToken" text NOT NULL, "retweetPaginationToken" text NOT NULL, "postOfTheDay" boolean NOT NULL DEFAULT false, "primePost" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "arena_spaace_tweet"`);
        });
    }
}
exports.ArenaSpaaceTweetEntityAdded1709807735187 = ArenaSpaaceTweetEntityAdded1709807735187;
//# sourceMappingURL=1709807735187-arenaSpaaceTweetEntityAdded.js.map