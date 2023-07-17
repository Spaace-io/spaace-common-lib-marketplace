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
exports.questPeriod1689606865263 = void 0;
class questPeriod1689606865263 {
    constructor() {
        this.name = 'questPeriod1689606865263';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" SET DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "limit" TYPE numeric(78,0)`);
        });
    }
}
exports.questPeriod1689606865263 = questPeriod1689606865263;
//# sourceMappingURL=1689606865263-questPeriod.js.map