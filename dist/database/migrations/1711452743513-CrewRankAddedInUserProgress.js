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
exports.CrewRankAddedInUserProgress1711452743513 = void 0;
class CrewRankAddedInUserProgress1711452743513 {
    constructor() {
        this.name = 'CrewRankAddedInUserProgress1711452743513';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "crewStars" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "crewRank" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "crewRank"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "crewStars"`);
        });
    }
}
exports.CrewRankAddedInUserProgress1711452743513 = CrewRankAddedInUserProgress1711452743513;
//# sourceMappingURL=1711452743513-CrewRankAddedInUserProgress.js.map