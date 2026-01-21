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
exports.AddSocialScoreAmbassadorEpoch1768994452361 = void 0;
class AddSocialScoreAmbassadorEpoch1768994452361 {
    constructor() {
        this.name = 'AddSocialScoreAmbassadorEpoch1768994452361';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN "socialScore" integer NULL
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD CONSTRAINT "chk_ambassador_epoch_leaderboard_socialScore_0_100"
      CHECK ("socialScore" IS NULL OR ("socialScore" >= 0 AND "socialScore" <= 100))
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP CONSTRAINT IF EXISTS "chk_ambassador_epoch_leaderboard_socialScore_0_100"
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN "socialScore"
    `);
        });
    }
}
exports.AddSocialScoreAmbassadorEpoch1768994452361 = AddSocialScoreAmbassadorEpoch1768994452361;
//# sourceMappingURL=1768994452361-AddSocialScoreAmbassadorEpoch.js.map