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
exports.referralCode1690300882013 = void 0;
class referralCode1690300882013 {
    constructor() {
        this.name = 'referralCode1690300882013';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" ADD "referralCode" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899" UNIQUE ("referralCode")`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referralCode"`);
        });
    }
}
exports.referralCode1690300882013 = referralCode1690300882013;
//# sourceMappingURL=1690300882013-referralCode.js.map