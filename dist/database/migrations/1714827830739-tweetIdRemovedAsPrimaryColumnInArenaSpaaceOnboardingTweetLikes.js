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
exports.TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739 = void 0;
class TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739 {
    constructor() {
        this.name = 'TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466" PRIMARY KEY ("userTwitter")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b" PRIMARY KEY ("tweetId", "userTwitter")`);
        });
    }
}
exports.TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739 = TweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes1714827830739;
//# sourceMappingURL=1714827830739-tweetIdRemovedAsPrimaryColumnInArenaSpaaceOnboardingTweetLikes.js.map