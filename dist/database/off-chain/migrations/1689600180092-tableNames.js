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
exports.tableNames1689600180092 = void 0;
class tableNames1689600180092 {
    constructor() {
        this.name = 'tableNames1689600180092';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "login_nonce" RENAME TO "login_nonces"`);
            yield queryRunner.query(`ALTER TABLE "season" RENAME TO "seasons"`);
            yield queryRunner.query(`ALTER TABLE "season_rank" RENAME TO "season_ranks"`);
            yield queryRunner.query(`ALTER TABLE "quest" RENAME TO "quests"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claim" RENAME TO "user_season_rank_claims"`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyPoints" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyRewards" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "loyaltyRewardsClaimed" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewardsClaimed"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyRewards"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loyaltyPoints"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" RENAME TO "user_season_rank_claim"`);
            yield queryRunner.query(`ALTER TABLE "quests" RENAME TO "quest"`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" RENAME TO "season_rank"`);
            yield queryRunner.query(`ALTER TABLE "seasons" RENAME TO "season"`);
            yield queryRunner.query(`ALTER TABLE "login_nonces" RENAME TO "login_nonce"`);
        });
    }
}
exports.tableNames1689600180092 = tableNames1689600180092;
//# sourceMappingURL=1689600180092-tableNames.js.map