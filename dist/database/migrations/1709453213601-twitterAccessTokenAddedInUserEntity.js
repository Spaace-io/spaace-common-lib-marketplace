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
exports.TwitterAccessTokenAddedInUserEntity1709453213601 = void 0;
class TwitterAccessTokenAddedInUserEntity1709453213601 {
    constructor() {
        this.name = 'TwitterAccessTokenAddedInUserEntity1709453213601';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "twitterAccessToken" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_50231f38688a079dc31f67399ad" UNIQUE ("twitterAccessToken")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_50231f38688a079dc31f67399ad"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "twitterAccessToken"`);
        });
    }
}
exports.TwitterAccessTokenAddedInUserEntity1709453213601 = TwitterAccessTokenAddedInUserEntity1709453213601;
//# sourceMappingURL=1709453213601-twitterAccessTokenAddedInUserEntity.js.map