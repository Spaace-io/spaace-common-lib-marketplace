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
exports.TwitterIdAddedInArenaUserEntity1709460865132 = void 0;
class TwitterIdAddedInArenaUserEntity1709460865132 {
    constructor() {
        this.name = 'TwitterIdAddedInArenaUserEntity1709460865132';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "userTwitterId" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_e830721892799dc0da5013bbc0d" UNIQUE ("userTwitterId")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_e830721892799dc0da5013bbc0d"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "userTwitterId"`);
        });
    }
}
exports.TwitterIdAddedInArenaUserEntity1709460865132 = TwitterIdAddedInArenaUserEntity1709460865132;
//# sourceMappingURL=1709460865132-twitterIdAddedInArenaUserEntity.js.map