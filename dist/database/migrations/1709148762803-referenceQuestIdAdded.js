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
exports.ReferenceQuestIdAdded1709148762803 = void 0;
class ReferenceQuestIdAdded1709148762803 {
    constructor() {
        this.name = 'ReferenceQuestIdAdded1709148762803';
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
exports.ReferenceQuestIdAdded1709148762803 = ReferenceQuestIdAdded1709148762803;
//# sourceMappingURL=1709148762803-referenceQuestIdAdded.js.map