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
exports.CronParameterAddedinCron1709209021892 = void 0;
class CronParameterAddedinCron1709209021892 {
    constructor() {
        this.name = 'CronParameterAddedinCron1709209021892';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "cronName" TO "cron"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" jsonb`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cron"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cron" text`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" RENAME COLUMN "cron" TO "cronName"`);
        });
    }
}
exports.CronParameterAddedinCron1709209021892 = CronParameterAddedinCron1709209021892;
//# sourceMappingURL=1709209021892-cronParameterAddedinCron.js.map