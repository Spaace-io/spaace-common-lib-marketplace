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
exports.questDescription1690477138482 = void 0;
class questDescription1690477138482 {
    constructor() {
        this.name = 'questDescription1690477138482';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" ADD "description" text`);
            yield queryRunner.query(`UPDATE "quests" SET "description" = "name"`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "description" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "description"`);
        });
    }
}
exports.questDescription1690477138482 = questDescription1690477138482;
//# sourceMappingURL=1690477138482-questDescription.js.map