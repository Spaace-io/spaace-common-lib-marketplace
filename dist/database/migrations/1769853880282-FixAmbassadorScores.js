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
exports.FixAmbassadorScores1769853880282 = void 0;
class FixAmbassadorScores1769853880282 {
    constructor() {
        this.name = 'FixAmbassadorScores1769853880282';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
        ALTER TABLE "ambassador_epoch_leaderboard"
        DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      `);
            yield queryRunner.query(`
        ALTER TABLE "ambassador_epoch_leaderboard"
        ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_non_negative"
        CHECK ("socialScore" IS NULL OR "socialScore" >= 0)
      `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_non_negative"
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      CHECK ("socialScore" IS NULL OR ("socialScore" >= 0 AND "socialScore" <= 100))
    `);
        });
    }
}
exports.FixAmbassadorScores1769853880282 = FixAmbassadorScores1769853880282;
//# sourceMappingURL=1769853880282-FixAmbassadorScores.js.map