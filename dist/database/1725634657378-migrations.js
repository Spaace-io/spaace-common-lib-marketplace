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
exports.Migrations1725634657378 = void 0;
class Migrations1725634657378 {
    constructor() {
        this.name = 'Migrations1725634657378';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_loyalties" DROP COLUMN "rank"`);
            yield queryRunner.query(`DROP TYPE "public"."rank"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE TYPE "public"."rank" AS ENUM('BRONZE_1', 'BRONZE_2', 'BRONZE_3', 'BRONZE_4', 'BRONZE_5', 'DIAMOND_1', 'DIAMOND_2', 'DIAMOND_3', 'DIAMOND_4', 'DIAMOND_5', 'GOLD_1', 'GOLD_2', 'GOLD_3', 'GOLD_4', 'GOLD_5', 'PLATINUM_1', 'PLATINUM_2', 'PLATINUM_3', 'PLATINUM_4', 'PLATINUM_5', 'SILVER_1', 'SILVER_2', 'SILVER_3', 'SILVER_4', 'SILVER_5')`);
            yield queryRunner.query(`ALTER TABLE "user_loyalties" ADD "rank" "public"."rank" NOT NULL`);
        });
    }
}
exports.Migrations1725634657378 = Migrations1725634657378;
//# sourceMappingURL=1725634657378-migrations.js.map