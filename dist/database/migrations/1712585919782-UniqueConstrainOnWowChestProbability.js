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
exports.UniqueConstrainOnWowChestProbability1712585919782 = void 0;
class UniqueConstrainOnWowChestProbability1712585919782 {
    constructor() {
        this.name = 'UniqueConstrainOnWowChestProbability1712585919782';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`);
        });
    }
}
exports.UniqueConstrainOnWowChestProbability1712585919782 = UniqueConstrainOnWowChestProbability1712585919782;
//# sourceMappingURL=1712585919782-UniqueConstrainOnWowChestProbability.js.map