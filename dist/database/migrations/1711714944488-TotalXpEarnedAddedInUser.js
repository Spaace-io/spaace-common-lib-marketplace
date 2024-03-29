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
exports.TotalXpEarnedAddedInUser1711714944488 = void 0;
class TotalXpEarnedAddedInUser1711714944488 {
    constructor() {
        this.name = 'TotalXpEarnedAddedInUser1711714944488';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" RENAME COLUMN "loyatyPointsEarned" TO "totalXpEarned"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" RENAME COLUMN "totalXpEarned" TO "loyatyPointsEarned"`);
        });
    }
}
exports.TotalXpEarnedAddedInUser1711714944488 = TotalXpEarnedAddedInUser1711714944488;
//# sourceMappingURL=1711714944488-TotalXpEarnedAddedInUser.js.map