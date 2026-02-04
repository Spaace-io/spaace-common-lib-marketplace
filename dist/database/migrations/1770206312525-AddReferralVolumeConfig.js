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
exports.AddReferralVolumeConfig1770206312525 = void 0;
class AddReferralVolumeConfig1770206312525 {
    constructor() {
        this.name = 'AddReferralVolumeConfig1770206312525';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epochs"
      ADD COLUMN IF NOT EXISTS "newUsersLookbackDays" integer NOT NULL DEFAULT 7;
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      ADD COLUMN IF NOT EXISTS "newUsersReferralTradingVolume" numeric(78) NOT NULL DEFAULT '0';
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epoch_leaderboard"
      DROP COLUMN IF EXISTS "newUsersReferralTradingVolume";
    `);
            yield queryRunner.query(`
      ALTER TABLE "ambassador_epochs"
      DROP COLUMN IF EXISTS "newUsersLookbackDays";
    `);
        });
    }
}
exports.AddReferralVolumeConfig1770206312525 = AddReferralVolumeConfig1770206312525;
//# sourceMappingURL=1770206312525-AddReferralVolumeConfig.js.map