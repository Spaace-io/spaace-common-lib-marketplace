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
exports.Migrations1753870555608 = void 0;
class Migrations1753870555608 {
    constructor() {
        this.name = 'Migrations1753870555608';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users_fee_commission" ADD "referrerAddress" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "users_fee_commission" ADD CONSTRAINT "unique_address_day" UNIQUE ("address", "day", "referrerAddress")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "users_fee_commission" DROP COLUMN "referrerAddress"`);
            yield queryRunner.query(`ALTER TABLE "users_fee_commission" DROP CONSTRAINT "unique_address_day"`);
        });
    }
}
exports.Migrations1753870555608 = Migrations1753870555608;
//# sourceMappingURL=1753870555608-fee-commission-v2.js.map