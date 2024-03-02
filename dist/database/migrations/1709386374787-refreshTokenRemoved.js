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
exports.RefreshTokenRemoved1709386374787 = void 0;
class RefreshTokenRemoved1709386374787 {
    constructor() {
        this.name = 'RefreshTokenRemoved1709386374787';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_b59fa299832f49b1743df66b57c"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "twitterRefreshToken"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "twitterRefreshToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_b59fa299832f49b1743df66b57c" UNIQUE ("twitterRefreshToken")`);
        });
    }
}
exports.RefreshTokenRemoved1709386374787 = RefreshTokenRemoved1709386374787;
//# sourceMappingURL=1709386374787-refreshTokenRemoved.js.map