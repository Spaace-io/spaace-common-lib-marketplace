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
exports.RefrenceQuestIdInArenaQuest1709136051268 = void 0;
class RefrenceQuestIdInArenaQuest1709136051268 {
    constructor() {
        this.name = 'RefrenceQuestIdInArenaQuest1709136051268';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "referenceQuestId" uuid`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "referenceQuestId"`);
        });
    }
}
exports.RefrenceQuestIdInArenaQuest1709136051268 = RefrenceQuestIdInArenaQuest1709136051268;
//# sourceMappingURL=1709136051268-refrenceQuestIdInArenaQuest.js.map