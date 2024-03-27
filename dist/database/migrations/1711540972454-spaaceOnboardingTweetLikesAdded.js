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
exports.SpaaceOnboardingTweetLikesAdded1711540972454 = void 0;
class SpaaceOnboardingTweetLikesAdded1711540972454 {
    constructor() {
        this.name = 'SpaaceOnboardingTweetLikesAdded1711540972454';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63"`);
            yield queryRunner.query(`CREATE TABLE "arena_spaace_onboarding_tweet_likes" ("tweetId" text NOT NULL, "userTwitter" text NOT NULL, CONSTRAINT "PK_0cdb4741b6b2f9ded38a320b35b" PRIMARY KEY ("tweetId", "userTwitter"))`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId")`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "userTwitter"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "userTwitter" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b" PRIMARY KEY ("tweetId", "userTwitter")`);
            yield queryRunner.query(`DROP TABLE "arena_spaace_onboarding_tweet_likes"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.SpaaceOnboardingTweetLikesAdded1711540972454 = SpaaceOnboardingTweetLikesAdded1711540972454;
//# sourceMappingURL=1711540972454-spaaceOnboardingTweetLikesAdded.js.map