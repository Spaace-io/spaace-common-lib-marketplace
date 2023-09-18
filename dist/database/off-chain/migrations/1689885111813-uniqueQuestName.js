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
exports.uniqueQuestName1689885111813 = void 0;
class uniqueQuestName1689885111813 {
    constructor() {
        this.name = 'uniqueQuestName1689885111813';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d"`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139" UNIQUE ("seasonNumber", "name")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "UQ_4d91b52a8e3fe3ce2caac4a6139"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_a1ec04b12249ff8ebcefae3296d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "FK_f9c7c1e4de57edd064178cecc4d" FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.uniqueQuestName1689885111813 = uniqueQuestName1689885111813;
//# sourceMappingURL=1689885111813-uniqueQuestName.js.map