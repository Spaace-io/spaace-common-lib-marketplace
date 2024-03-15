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
exports.LinkAndPasswordAddedInCrew1710499176048 = void 0;
class LinkAndPasswordAddedInCrew1710499176048 {
    constructor() {
        this.name = 'LinkAndPasswordAddedInCrew1710499176048';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crews" ADD "link" text NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_crews" ADD "password" text NOT NULL`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_type" RENAME TO "arena_quest_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type" USING "type"::"text"::"public"."arena_quest_type"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_type_old"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."arena_quest_type_old" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE')`);
            yield queryRunner.query(`ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type_old" USING "type"::"text"::"public"."arena_quest_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_quest_type_old" RENAME TO "arena_quest_type"`);
            yield queryRunner.query(`ALTER TABLE "arena_crews" DROP COLUMN "password"`);
            yield queryRunner.query(`ALTER TABLE "arena_crews" DROP COLUMN "link"`);
        });
    }
}
exports.LinkAndPasswordAddedInCrew1710499176048 = LinkAndPasswordAddedInCrew1710499176048;
//# sourceMappingURL=1710499176048-linkAndPasswordAddedInCrew.js.map