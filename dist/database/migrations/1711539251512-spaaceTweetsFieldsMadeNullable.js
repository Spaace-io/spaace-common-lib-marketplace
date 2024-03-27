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
exports.SpaaceTweetsFieldsMadeNullable1711539251512 = void 0;
class SpaaceTweetsFieldsMadeNullable1711539251512 {
    constructor() {
        this.name = 'SpaaceTweetsFieldsMadeNullable1711539251512';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "primePost"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "onboardingPost"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likePaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "replyPaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "quotePaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetPaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "likePaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "replyPaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "quotePaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "retweetPaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "primePost" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "onboardingPost" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "userTwitter" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b" PRIMARY KEY ("tweetId", "userTwitter")`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_type" RENAME TO "arena_quest_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW', 'ONBOARDING')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type" USING "type"::"text"::"public"."arena_quest_type"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_type_old"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_9bbffd9ece6efd609bb80260e63"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_type_old" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type_old" USING "type"::"text"::"public"."arena_quest_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_type_old" RENAME TO "arena_quest_type"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "PK_e4a907f589afb2a766c42d86d8b"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "PK_b7522e7351745c4ac869a9ed2eb" PRIMARY KEY ("tweetId")`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "userTwitter"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "onboardingPost"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "primePost"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "postOfTheDay"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetPaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "quotePaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "replyPaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likePaginationToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "retweetPaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "quotePaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "replyPaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "likePaginationToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "onboardingPost" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "primePost" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "postOfTheDay" boolean NOT NULL DEFAULT false`);
        });
    }
}
exports.SpaaceTweetsFieldsMadeNullable1711539251512 = SpaaceTweetsFieldsMadeNullable1711539251512;
//# sourceMappingURL=1711539251512-spaaceTweetsFieldsMadeNullable.js.map