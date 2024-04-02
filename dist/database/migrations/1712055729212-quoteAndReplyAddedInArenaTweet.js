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
exports.QuoteAndReplyAddedInArenaTweet1712055729212 = void 0;
class QuoteAndReplyAddedInArenaTweet1712055729212 {
    constructor() {
        this.name = 'QuoteAndReplyAddedInArenaTweet1712055729212';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_tweet" ADD "quoteTweetId" text`);
            yield queryRunner.query(`ALTER TABLE "arena_tweet" ADD "replyTweetId" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_tweet" DROP COLUMN "replyTweetId"`);
            yield queryRunner.query(`ALTER TABLE "arena_tweet" DROP COLUMN "quoteTweetId"`);
        });
    }
}
exports.QuoteAndReplyAddedInArenaTweet1712055729212 = QuoteAndReplyAddedInArenaTweet1712055729212;
//# sourceMappingURL=1712055729212-quoteAndReplyAddedInArenaTweet.js.map