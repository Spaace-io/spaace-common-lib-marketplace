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
exports.TokenRemovedFromWowChest1713611987171 = void 0;
class TokenRemovedFromWowChest1713611987171 {
    constructor() {
        this.name = 'TokenRemovedFromWowChest1713611987171';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_wow_chest_type" RENAME TO "arena_wow_chest_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_wow_chest_type" AS ENUM('XP', 'BOOSTER', 'EMPTY', 'BITCOIN')`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "type" TYPE "public"."arena_wow_chest_type" USING "type"::"text"::"public"."arena_wow_chest_type"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type_old"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_wow_chest_type_old" AS ENUM('XP', 'TOKEN', 'BOOSTER', 'EMPTY', 'BITCOIN')`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "type" TYPE "public"."arena_wow_chest_type_old" USING "type"::"text"::"public"."arena_wow_chest_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_wow_chest_type_old" RENAME TO "arena_wow_chest_type"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`);
        });
    }
}
exports.TokenRemovedFromWowChest1713611987171 = TokenRemovedFromWowChest1713611987171;
//# sourceMappingURL=1713611987171-tokenRemovedFromWowChest.js.map