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
exports.RankInQuest1708299044785 = void 0;
class RankInQuest1708299044785 {
    constructor() {
        this.name = 'RankInQuest1708299044785';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."loyalty_rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`);
            yield queryRunner.query(`ALTER TABLE "quests" ADD "rank" "public"."loyalty_rank" NOT NULL DEFAULT 'BRONZE_5'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "quests" DROP COLUMN "rank"`);
            yield queryRunner.query(`DROP TYPE "public"."loyalty_rank"`);
        });
    }
}
exports.RankInQuest1708299044785 = RankInQuest1708299044785;
//# sourceMappingURL=1708299044785-rankInQuest.js.map