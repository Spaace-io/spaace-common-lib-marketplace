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
exports.questSequence1689606459294 = void 0;
class questSequence1689606459294 {
    constructor() {
        this.name = 'questSequence1689606459294';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ADD "previousQuestId" uuid`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "prime" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "REL_f94aec94cffab50834b8edaa1f" UNIQUE ("seasonNumber", "previousQuestId")`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe" FOREIGN KEY ("seasonNumber", "previousQuestId") REFERENCES "quests"("seasonNumber","id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "FK_f94aec94cffab50834b8edaa1fe"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP CONSTRAINT "REL_f94aec94cffab50834b8edaa1f"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "prime"`);
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "previousQuestId"`);
        });
    }
}
exports.questSequence1689606459294 = questSequence1689606459294;
//# sourceMappingURL=1689606459294-questSequence.js.map