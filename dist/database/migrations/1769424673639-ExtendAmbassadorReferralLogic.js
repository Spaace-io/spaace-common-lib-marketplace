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
exports.ExtendAmbassadorReferralLogic1769424673639 = void 0;
class ExtendAmbassadorReferralLogic1769424673639 {
    constructor() {
        this.name = 'ExtendAmbassadorReferralLogic1769424673639';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "users"
      ADD COLUMN IF NOT EXISTS "referralActivatedAt" timestamp without time zone NULL
    `);
            yield queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "users_referrer_activated_at_idx"
      ON "users" ("referrerAddress", "referralActivatedAt")
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN IF NOT EXISTS "newActiveReferralsCount" int NOT NULL DEFAULT 0
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN IF EXISTS "newActiveReferralsCount"
    `);
            yield queryRunner.query(`
      DROP INDEX IF EXISTS "users_referrer_activated_at_idx"
    `);
            yield queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN IF EXISTS "referralActivatedAt"
    `);
        });
    }
}
exports.ExtendAmbassadorReferralLogic1769424673639 = ExtendAmbassadorReferralLogic1769424673639;
//# sourceMappingURL=1769424673639-ExtendAmbassadorReferralLogic.js.map