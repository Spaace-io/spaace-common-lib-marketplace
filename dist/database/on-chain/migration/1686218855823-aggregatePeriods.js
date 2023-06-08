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
exports.aggregatePeriods1686218855823 = void 0;
class aggregatePeriods1686218855823 {
    constructor() {
        this.name = 'aggregatePeriods1686218855823';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume1h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volumeChange1h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volume6h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "volumeChange6h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorChange1h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "floorChange6h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount1h" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "saleCount6h" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount6h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "saleCount1h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorChange6h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "floorChange1h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volumeChange6h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume6h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volumeChange1h"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume1h"`);
        });
    }
}
exports.aggregatePeriods1686218855823 = aggregatePeriods1686218855823;
//# sourceMappingURL=1686218855823-aggregatePeriods.js.map