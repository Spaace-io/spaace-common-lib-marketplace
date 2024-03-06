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
exports.TweetEntityAdded1709726555013 = void 0;
class TweetEntityAdded1709726555013 {
    constructor() {
        this.name = 'TweetEntityAdded1709726555013';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_tweet" ("id" text NOT NULL, "authorId" text NOT NULL, "text" text NOT NULL, "likeCount" numeric(78) NOT NULL DEFAULT '0', "replyCount" numeric(78) NOT NULL DEFAULT '0', "retweetCount" numeric(78) NOT NULL DEFAULT '0', "viewCount" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_137bbd977cd59a0256a50ff5689" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "arena_tweet"`);
        });
    }
}
exports.TweetEntityAdded1709726555013 = TweetEntityAdded1709726555013;
//# sourceMappingURL=1709726555013-tweetEntityAdded.js.map