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
exports.NumberOfLeaguesAddedInArenaDivision1710089840635 = void 0;
class NumberOfLeaguesAddedInArenaDivision1710089840635 {
    constructor() {
        this.name = 'NumberOfLeaguesAddedInArenaDivision1710089840635';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_divisions" RENAME COLUMN "leagueUserMaxCap" TO "numberOfLeagues"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_divisions" RENAME COLUMN "numberOfLeagues" TO "leagueUserMaxCap"`);
        });
    }
}
exports.NumberOfLeaguesAddedInArenaDivision1710089840635 = NumberOfLeaguesAddedInArenaDivision1710089840635;
//# sourceMappingURL=1710089840635-NumberOfLeaguesAddedInArenaDivision.js.map