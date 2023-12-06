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
exports.RemoveQuestCountNullableField1701875755712 = void 0;
class RemoveQuestCountNullableField1701875755712 {
    constructor() {
        this.name = 'RemoveQuestCountNullableField1701875755712';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "count" TYPE numeric(78)`);
            yield queryRunner.query(`UPDATE "quests" SET "count" = 1 WHERE "count" IS NULL`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "count" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "count" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "count" TYPE numeric(78,0)`);
        });
    }
}
exports.RemoveQuestCountNullableField1701875755712 = RemoveQuestCountNullableField1701875755712;
//# sourceMappingURL=1701875755712-removeQuestCountNullableField.js.map