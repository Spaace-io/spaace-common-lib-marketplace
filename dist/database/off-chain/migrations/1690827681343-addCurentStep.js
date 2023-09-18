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
exports.addCurentStep1690827681343 = void 0;
class addCurentStep1690827681343 {
    constructor() {
        this.name = 'addCurentStep1690827681343';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "progressCurrentStep" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1f33a9060ecaab5da0215be1330" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep")`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "countForCurrentStep" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1f33a9060ecaab5da0215be1330"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep", "countForCurrentStep")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_6cff680ed2b793899cfb3dc8167"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1f33a9060ecaab5da0215be1330" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce", "progressCurrentStep")`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "countForCurrentStep"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1f33a9060ecaab5da0215be1330"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "progressCurrentStep"`);
        });
    }
}
exports.addCurentStep1690827681343 = addCurentStep1690827681343;
//# sourceMappingURL=1690827681343-addCurentStep.js.map