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
exports.UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640 = void 0;
class UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640 {
    constructor() {
        this.name = 'UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" DROP CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_onboarding_tweet_likes" ADD CONSTRAINT "FK_b69a58b9dd5662f3ba434bf4466" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640 = UserTwitterMadeTextInArenaSpaaceOnboardingTweetLikes1714825335640;
//# sourceMappingURL=1714825335640-userTwitterMadeTextInArenaSpaaceOnboardingTweetLikes.js.map