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
exports.AddQuestTypeToQuests1732293508607 = void 0;
class AddQuestTypeToQuests1732293508607 {
    constructor() {
        this.name = 'AddQuestTypeToQuests1732293508607';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "quest_type_enum" AS ENUM ('GENESIS', 'PRIME', 'DAILY', 'PROGRESSIVE')`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "questType" "quest_type_enum" NOT NULL DEFAULT 'GENESIS'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "questType"`);
            yield queryRunner.query(`DROP TYPE "quest_type_enum"`);
        });
    }
}
exports.AddQuestTypeToQuests1732293508607 = AddQuestTypeToQuests1732293508607;
//# sourceMappingURL=1732293508607-AddQuestTypeToQuests.js.map