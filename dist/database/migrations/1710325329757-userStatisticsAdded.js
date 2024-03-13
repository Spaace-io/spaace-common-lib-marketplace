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
exports.UserStatisticsAdded1710325329757 = void 0;
class UserStatisticsAdded1710325329757 {
    constructor() {
        this.name = 'UserStatisticsAdded1710325329757';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalReplies" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalQuotes" integer NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`);
        });
    }
}
exports.UserStatisticsAdded1710325329757 = UserStatisticsAdded1710325329757;
//# sourceMappingURL=1710325329757-userStatisticsAdded.js.map