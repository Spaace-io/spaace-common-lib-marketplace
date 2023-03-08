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
exports.rarityScoreFloat1678292482803 = void 0;
class rarityScoreFloat1678292482803 {
    constructor() {
        this.name = 'rarityScoreFloat1678292482803';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "importItems"`);
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "rarityScore" double precision`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "items" DROP COLUMN "rarityScore"`);
            yield queryRunner.query(`ALTER TABLE "items" ADD "rarityScore" numeric(19,0)`);
            yield queryRunner.query(`ALTER TABLE "collections" ADD "importItems" boolean NOT NULL DEFAULT false`);
        });
    }
}
exports.rarityScoreFloat1678292482803 = rarityScoreFloat1678292482803;
//# sourceMappingURL=1678292482803-rarityScoreFloat.js.map