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
exports.CronParameterSeperatedInCron1709209796750 = void 0;
class CronParameterSeperatedInCron1709209796750 {
    constructor() {
        this.name = 'CronParameterSeperatedInCron1709209796750';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cronName" text`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cronParameter" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cronParameter"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cronName"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" jsonb`);
        });
    }
}
exports.CronParameterSeperatedInCron1709209796750 = CronParameterSeperatedInCron1709209796750;
//# sourceMappingURL=1709209796750-cronParameterSeperatedInCron.js.map