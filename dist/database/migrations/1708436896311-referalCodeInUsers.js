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
exports.ReferalCodeInUsers1708436896311 = void 0;
class ReferalCodeInUsers1708436896311 {
    constructor() {
        this.name = 'ReferalCodeInUsers1708436896311';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "referralCode" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac" UNIQUE ("referralCode")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "referralCode"`);
        });
    }
}
exports.ReferalCodeInUsers1708436896311 = ReferalCodeInUsers1708436896311;
//# sourceMappingURL=1708436896311-referalCodeInUsers.js.map