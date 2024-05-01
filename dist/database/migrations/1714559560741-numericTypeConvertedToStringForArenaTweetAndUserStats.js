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
exports.NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741 = void 0;
class NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741 {
    constructor() {
        this.name = 'NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalLikes"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalLikes" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReposts"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalReposts" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalReplies" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalQuotes" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalQuotes" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalReplies" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReposts"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalReposts" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "totalLikes"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "totalLikes" integer NOT NULL`);
        });
    }
}
exports.NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741 = NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741;
//# sourceMappingURL=1714559560741-numericTypeConvertedToStringForArenaTweetAndUserStats.js.map