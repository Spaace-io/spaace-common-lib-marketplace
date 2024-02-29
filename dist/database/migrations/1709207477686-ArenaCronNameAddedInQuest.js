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
exports.ArenaCronNameAddedInQuest1709207477686 = void 0;
class ArenaCronNameAddedInQuest1709207477686 {
    constructor() {
        this.name = 'ArenaCronNameAddedInQuest1709207477686';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crons" DROP COLUMN "parameter"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "cronName" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "cronName"`);
            yield queryRunner.query(`ALTER TABLE "arena_crons" ADD "parameter" text array NOT NULL`);
        });
    }
}
exports.ArenaCronNameAddedInQuest1709207477686 = ArenaCronNameAddedInQuest1709207477686;
//# sourceMappingURL=1709207477686-ArenaCronNameAddedInQuest.js.map