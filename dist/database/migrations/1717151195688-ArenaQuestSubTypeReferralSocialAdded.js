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
exports.ArenaQuestSubTypeReferralSocialAdded1717151195688 = void 0;
class ArenaQuestSubTypeReferralSocialAdded1717151195688 {
    constructor() {
        this.name = 'ArenaQuestSubTypeReferralSocialAdded1717151195688';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_sub_type" RENAME TO "arena_quest_sub_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_sub_type" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'REFERRAL_SOCIAL', 'OTHERS')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type" USING "subType"::"text"::"public"."arena_quest_sub_type"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type_old"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_sub_type_old" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'OTHERS')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type_old" USING "subType"::"text"::"public"."arena_quest_sub_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_sub_type_old" RENAME TO "arena_quest_sub_type"`);
        });
    }
}
exports.ArenaQuestSubTypeReferralSocialAdded1717151195688 = ArenaQuestSubTypeReferralSocialAdded1717151195688;
//# sourceMappingURL=1717151195688-ArenaQuestSubTypeReferralSocialAdded.js.map