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
exports.AddUserQuestProcessing1760365350460 = void 0;
class AddUserQuestProcessing1760365350460 {
    constructor() {
        this.name = 'AddUserQuestProcessing1760365350460';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user_quest_processing" ("userAddress" character(40) NOT NULL, "questId" uuid NOT NULL, "seasonNumber" text NOT NULL, "scopeKey" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_7bf615f6329e7a275f1c1edcd8e" PRIMARY KEY ("userAddress", "questId", "seasonNumber", "scopeKey"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "user_quest_processing"`);
        });
    }
}
exports.AddUserQuestProcessing1760365350460 = AddUserQuestProcessing1760365350460;
//# sourceMappingURL=1760365350460-AddUserQuestProcessing.js.map