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
exports.IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209 = void 0;
class IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209 {
    constructor() {
        this.name = 'IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4" PRIMARY KEY ("userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_31d3af91969ca277c4467ed19e3" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_31d3af91969ca277c4467ed19e3"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4" PRIMARY KEY ("userTwitter", "id")`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "PK_c46c4367fbe3274cb50a620c2a4"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "PK_b69a58b9dd5662f3ba434bf4466" PRIMARY KEY ("userTwitter")`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP COLUMN "id"`);
        });
    }
}
exports.IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209 = IdColumnAddedInArenaSpaaceOnboardingTweetLikes1715265891209;
//# sourceMappingURL=1715265891209-idColumnAddedInArenaSpaaceOnboardingTweetLikes.js.map