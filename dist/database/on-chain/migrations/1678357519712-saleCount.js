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
exports.saleCount1678357519712 = void 0;
class saleCount1678357519712 {
    constructor() {
        this.name = 'saleCount1678357519712';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount24h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount7d" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount30d" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount30d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount7d"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount24h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount"`);
        });
    }
}
exports.saleCount1678357519712 = saleCount1678357519712;
//# sourceMappingURL=1678357519712-saleCount.js.map