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
exports.TypeAddedInBooster1715527857014 = void 0;
class TypeAddedInBooster1715527857014 {
    constructor() {
        this.name = 'TypeAddedInBooster1715527857014';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."booster_type" AS ENUM('SPECIAL', 'WOW_CHEST')`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ADD "type" "public"."booster_type" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" DROP COLUMN "type"`);
            yield queryRunner.query(`DROP TYPE "public"."booster_type"`);
        });
    }
}
exports.TypeAddedInBooster1715527857014 = TypeAddedInBooster1715527857014;
//# sourceMappingURL=1715527857014-typeAddedInBooster.js.map