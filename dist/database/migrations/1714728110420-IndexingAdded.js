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
exports.IndexingAdded1714728110420 = void 0;
class IndexingAdded1714728110420 {
    constructor() {
        this.name = 'IndexingAdded1714728110420';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`CREATE INDEX "IDX_5369e233e18e92fecb08b7991a" ON "arena_users" ("twitterUsername") `);
            yield queryRunner.query(`CREATE INDEX "IDX_6116a28ce34f6bcb2fb3735f5a" ON "arena_users" ("referralCode") `);
            yield queryRunner.query(`CREATE INDEX "IDX_0cece92ebcf29a89687133a476" ON "arena_users" ("crewName") `);
            yield queryRunner.query(`CREATE INDEX "IDX_adbe3f13cde72d3e0e59cc2745" ON "arena_users_progress" ("rank") `);
            yield queryRunner.query(`CREATE INDEX "IDX_9d28e5a1d308eeba7eb74223b3" ON "arena_users_progress" ("twentyFourHourRank") `);
            yield queryRunner.query(`CREATE INDEX "IDX_0bf4352e67a4f9082b2d879390" ON "arena_users_progress" ("division", "league", "leagueRank") `);
            yield queryRunner.query(`CREATE INDEX "IDX_8b24ff8e11120eba8598149a0b" ON "arena_users_earned_chest" ("userTwitterId", "id") `);
            yield queryRunner.query(`CREATE INDEX "IDX_53feb0270ffc58e7ed5f1f0ae4" ON "arena_crews" ("name") `);
            yield queryRunner.query(`CREATE INDEX "IDX_84bde20a3cea54eb69312a7868" ON "arena_crew_progress" ("stars") `);
            yield queryRunner.query(`CREATE INDEX "IDX_46ba2feb436b75b81849164b9a" ON "arena_crew_progress" ("rank") `);
            yield queryRunner.query(`CREATE INDEX "IDX_c511f9ef0a4a2e41cec14153df" ON "arena_crew_progress" ("twentyFourHourRank") `);
            yield queryRunner.query(`CREATE INDEX "IDX_7470b0c6f0e975f478662a660b" ON "arena_spaace_tweet" ("postOfTheDay") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d02aaa5d3b3eda8e962da3a938" ON "arena_spaace_tweet" ("primePost") `);
            yield queryRunner.query(`CREATE INDEX "IDX_c85ab52359178efe108bec82aa" ON "arena_spaace_tweet" ("onboardingPost") `);
            yield queryRunner.query(`CREATE INDEX "IDX_07accd2c97ad4cab9b5ddbeb07" ON "arena_tweet" ("authorId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_c0810a60411cef26ad2362748e" ON "arena_tweet" ("text") `);
            yield queryRunner.query(`CREATE INDEX "IDX_86c55a1a06538cf396e4dbbd93" ON "arena_user_stars_tracking" ("userTwitterId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_3e6c6386c1872b76c624596129" ON "arena_users_claimed_wow_chest" ("chestPeriod", "userTwitterId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d88598a9b134a17250fd0761fd" ON "arena_users_booster" ("userTwitterId", "seasonNumber", "expiresOn") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_d88598a9b134a17250fd0761fd"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_3e6c6386c1872b76c624596129"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_86c55a1a06538cf396e4dbbd93"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c0810a60411cef26ad2362748e"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_07accd2c97ad4cab9b5ddbeb07"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c85ab52359178efe108bec82aa"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d02aaa5d3b3eda8e962da3a938"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7470b0c6f0e975f478662a660b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c511f9ef0a4a2e41cec14153df"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_46ba2feb436b75b81849164b9a"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_84bde20a3cea54eb69312a7868"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_53feb0270ffc58e7ed5f1f0ae4"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_8b24ff8e11120eba8598149a0b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_0bf4352e67a4f9082b2d879390"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_9d28e5a1d308eeba7eb74223b3"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_adbe3f13cde72d3e0e59cc2745"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_0cece92ebcf29a89687133a476"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_6116a28ce34f6bcb2fb3735f5a"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_5369e233e18e92fecb08b7991a"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
        });
    }
}
exports.IndexingAdded1714728110420 = IndexingAdded1714728110420;
//# sourceMappingURL=1714728110420-IndexingAdded.js.map