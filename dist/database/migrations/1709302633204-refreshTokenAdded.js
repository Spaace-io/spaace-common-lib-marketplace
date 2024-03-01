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
exports.RefreshTokenAdded1709302633204 = void 0;
class RefreshTokenAdded1709302633204 {
    constructor() {
        this.name = 'RefreshTokenAdded1709302633204';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "twitterRefreshToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_b59fa299832f49b1743df66b57c" UNIQUE ("twitterRefreshToken")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_b59fa299832f49b1743df66b57c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "twitterRefreshToken"`);
        });
    }
}
exports.RefreshTokenAdded1709302633204 = RefreshTokenAdded1709302633204;
//# sourceMappingURL=1709302633204-refreshTokenAdded.js.map