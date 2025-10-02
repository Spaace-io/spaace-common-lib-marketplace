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
exports.AddForeverQuestPeriod1759228670601 = void 0;
class AddForeverQuestPeriod1759228670601 {
    constructor() {
        this.name = 'AddForeverQuestPeriod1759228670601';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "public"."quest_period" ADD VALUE IF NOT EXISTS 'FOREVER'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "public"."quest_period" RENAME TO "quest_period_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."quest_period" AS ENUM('DAILY', 'SEASONAL')`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "period" TYPE "public"."quest_period" USING "period"::text::"public"."quest_period"`);
            yield queryRunner.query(`DROP TYPE "public"."quest_period_old"`);
        });
    }
}
exports.AddForeverQuestPeriod1759228670601 = AddForeverQuestPeriod1759228670601;
//# sourceMappingURL=1759228670601-AddForeverQuestPeriod.js.map