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
exports.CrewTypeChestAddedInArenaChestNames1713351422350 = void 0;
class CrewTypeChestAddedInArenaChestNames1713351422350 {
    constructor() {
        this.name = 'CrewTypeChestAddedInArenaChestNames1713351422350';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TYPE "public"."arena_chest_name" RENAME TO "arena_chest_name_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW')`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name" USING "name"::"text"::"public"."arena_chest_name"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_chest_name_old"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE TYPE "public"."arena_chest_name_old" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS')`);
            yield queryRunner.query(`ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name_old" USING "name"::"text"::"public"."arena_chest_name_old"`);
            yield queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
            yield queryRunner.query(`ALTER TYPE "public"."arena_chest_name_old" RENAME TO "arena_chest_name"`);
        });
    }
}
exports.CrewTypeChestAddedInArenaChestNames1713351422350 = CrewTypeChestAddedInArenaChestNames1713351422350;
//# sourceMappingURL=1713351422350-CrewTypeChestAddedInArenaChestNames.js.map