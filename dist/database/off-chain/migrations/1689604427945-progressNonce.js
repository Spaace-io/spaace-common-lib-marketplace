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
exports.progressNonce1689604427945 = void 0;
class progressNonce1689604427945 {
    constructor() {
        this.name = 'progressNonce1689604427945';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD "nonce" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_1113118dfa3e1f35571ceebbd68"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38" PRIMARY KEY ("userAddress", "seasonNumber", "questId", "nonce")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP CONSTRAINT "PK_2d7da4fd6b94b753d49e95a9b38"`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" ADD CONSTRAINT "PK_1113118dfa3e1f35571ceebbd68" PRIMARY KEY ("userAddress", "seasonNumber", "questId")`);
            yield queryRunner.query(`ALTER TABLE "user_quest_progress" DROP COLUMN "nonce"`);
        });
    }
}
exports.progressNonce1689604427945 = progressNonce1689604427945;
//# sourceMappingURL=1689604427945-progressNonce.js.map