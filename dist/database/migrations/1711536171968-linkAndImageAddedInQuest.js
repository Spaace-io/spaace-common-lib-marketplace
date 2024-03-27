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
exports.LinkAndImageAddedInQuest1711536171968 = void 0;
class LinkAndImageAddedInQuest1711536171968 {
    constructor() {
        this.name = 'LinkAndImageAddedInQuest1711536171968';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "link" text`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ADD "image" text`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "image"`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "link"`);
        });
    }
}
exports.LinkAndImageAddedInQuest1711536171968 = LinkAndImageAddedInQuest1711536171968;
//# sourceMappingURL=1711536171968-linkAndImageAddedInQuest.js.map