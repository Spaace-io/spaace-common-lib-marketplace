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
exports.questBoost1691069696968 = void 0;
class questBoost1691069696968 {
    constructor() {
        this.name = 'questBoost1691069696968';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ADD "boost" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "boostLimit" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" SET DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "loyaltyPoints" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "boostLimit"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "boost"`);
        });
    }
}
exports.questBoost1691069696968 = questBoost1691069696968;
//# sourceMappingURL=1691069696968-questBoost.js.map