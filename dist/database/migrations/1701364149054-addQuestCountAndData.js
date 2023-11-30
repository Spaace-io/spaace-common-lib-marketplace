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
exports.AddQuestCountAndData1701364149054 = void 0;
class AddQuestCountAndData1701364149054 {
    constructor() {
        this.name = 'AddQuestCountAndData1701364149054';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ADD "count" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "currentStep"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "data" jsonb NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "data"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "currentStep" numeric(78,0) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "count"`);
        });
    }
}
exports.AddQuestCountAndData1701364149054 = AddQuestCountAndData1701364149054;
//# sourceMappingURL=1701364149054-addQuestCountAndData.js.map