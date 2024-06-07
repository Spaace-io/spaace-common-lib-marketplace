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
exports.ChestTypeReferralAdded1717802969608 = void 0;
class ChestTypeReferralAdded1717802969608 {
    constructor() {
        this.name = 'ChestTypeReferralAdded1717802969608';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" ADD "stars" numeric(78) NOT NULL DEFAULT '0'`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_chest_name" RENAME TO "arena_chest_name_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW', 'REFERRAL')`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name" USING "name"::"text"::"public"."arena_chest_name"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_chest_name_old"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_chest_name_old" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW')`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name_old" USING "name"::"text"::"public"."arena_chest_name_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_chest_name_old" RENAME TO "arena_chest_name"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_earned_chest" DROP COLUMN "stars"`);
        });
    }
}
exports.ChestTypeReferralAdded1717802969608 = ChestTypeReferralAdded1717802969608;
//# sourceMappingURL=1717802969608-ChestTypeReferralAdded.js.map