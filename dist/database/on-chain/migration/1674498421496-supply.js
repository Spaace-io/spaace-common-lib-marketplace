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
exports.supply1674498421496 = void 0;
class supply1674498421496 {
    constructor() {
        this.name = 'supply1674498421496';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarity"`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "totalSupply" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "ownerCount" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "rarityRanking" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "rarityScore" numeric(19)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityRanking"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "ownerCount"`);
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "totalSupply"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "rarity" jsonb`);
        });
    }
}
exports.supply1674498421496 = supply1674498421496;
//# sourceMappingURL=1674498421496-supply.js.map