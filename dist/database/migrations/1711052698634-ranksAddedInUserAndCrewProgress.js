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
exports.RanksAddedInUserAndCrewProgress1711052698634 = void 0;
class RanksAddedInUserAndCrewProgress1711052698634 {
    constructor() {
        this.name = 'RanksAddedInUserAndCrewProgress1711052698634';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "rank" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD "leagueRank" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" ADD "rank" numeric(78) NOT NULL DEFAULT '0'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_progress" DROP COLUMN "rank"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "leagueRank"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP COLUMN "rank"`);
        });
    }
}
exports.RanksAddedInUserAndCrewProgress1711052698634 = RanksAddedInUserAndCrewProgress1711052698634;
//# sourceMappingURL=1711052698634-ranksAddedInUserAndCrewProgress.js.map