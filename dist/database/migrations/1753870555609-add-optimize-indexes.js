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
exports.Migrations1753870555609 = void 0;
class Migrations1753870555609 {
    constructor() {
        this.name = 'Migrations1753870555609';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_user_xp_log_referral_performance" ON user_xp_log 
     ("userAddress", "source", "seasonNumber", "createdAt") 
     WHERE source = 'REFERRAL';`);
            yield queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_users_fee_commission_referrer_address" 
  ON users_fee_commission ("referrerAddress");`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX IF EXISTS "IDX_user_xp_log_referral_performance";`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "IDX_users_fee_commission_referrer_address";`);
        });
    }
}
exports.Migrations1753870555609 = Migrations1753870555609;
//# sourceMappingURL=1753870555609-add-optimize-indexes.js.map