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
exports.questDescription1691016788010 = void 0;
class questDescription1691016788010 {
    constructor() {
        this.name = 'questDescription1691016788010';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "description"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" RENAME COLUMN "progressCurrentStep" TO "currentStep"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "countForCurrentStep"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "countForCurrentStep" numeric(78,0) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" RENAME COLUMN "currentStep" TO "progressCurrentStep"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep", "countForCurrentStep")`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "description" text`);
            yield queryRunner.query(`UPDATE "quests" SET "description" = "name"`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "description" SET NOT NULL`);
        });
    }
}
exports.questDescription1691016788010 = questDescription1691016788010;
//# sourceMappingURL=1691016788010-questDescription.js.map