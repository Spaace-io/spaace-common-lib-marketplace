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
exports.enums1693490177571 = void 0;
class enums1693490177571 {
    constructor() {
        this.name = 'enums1693490177571';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`);
            yield queryRunner.query(`ALTER TYPE "public"."rank" RENAME TO "rank_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."rank" AS ENUM('BRONZE_5', 'BRONZE_4', 'BRONZE_3', 'BRONZE_2', 'BRONZE_1', 'SILVER_5', 'SILVER_4', 'SILVER_3', 'SILVER_2', 'SILVER_1', 'GOLD_5', 'GOLD_4', 'GOLD_3', 'GOLD_2', 'GOLD_1', 'PLATINUM_5', 'PLATINUM_4', 'PLATINUM_3', 'PLATINUM_2', 'PLATINUM_1', 'DIAMOND_5', 'DIAMOND_4', 'DIAMOND_3', 'DIAMOND_2', 'DIAMOND_1')`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" ALTER COLUMN "rank" TYPE "public"."rank" USING REPLACE(REPLACE(REPLACE(REPLACE(REPLACE("rank"::"text", 'D', 'DIAMOND_'), 'P', 'PLATINUM_'), 'G', 'GOLD_'), 'S', 'SILVER_'), 'B', 'BRONZE_')::"public"."rank"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ALTER COLUMN "rank" TYPE "public"."rank" USING REPLACE(REPLACE(REPLACE(REPLACE(REPLACE("rank"::"text", 'D', 'DIAMOND_'), 'P', 'PLATINUM_'), 'G', 'GOLD_'), 'S', 'SILVER_'), 'B', 'BRONZE_')::"public"."rank"`);
            yield queryRunner.query(`DROP TYPE "public"."rank_old"`);
            yield queryRunner.query(`ALTER TYPE "public"."quest_period" RENAME TO "quest_period_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."quest_period" AS ENUM('DAILY', 'SEASONAL')`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "period" TYPE "public"."quest_period" USING REPLACE(REPLACE("period"::"text", 'day', 'DAILY'), 'season', 'SEASONAL')::"public"."quest_period"`);
            yield queryRunner.query(`DROP TYPE "public"."quest_period_old"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" DROP CONSTRAINT "FK_f07c0d5dd258518c077b53950f5"`);
            yield queryRunner.query(`CREATE TYPE "public"."rank_old" AS ENUM('B5', 'B4', 'B3', 'B2', 'B1', 'S5', 'S4', 'S3', 'S2', 'S1', 'G5', 'G4', 'G3', 'G2', 'G1', 'P5', 'P4', 'P3', 'P2', 'P1', 'D5', 'D4', 'D3', 'D2', 'D1')`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ALTER COLUMN "rank" TYPE "public"."rank_old" USING CONCAT(SUBSTR("rank"::"text", 1, 1), SUBSTR("rank"::"text", LENGTH("rank"::"text"), 1))::"public"."rank_old"`);
            yield queryRunner.query(`ALTER TABLE "season_ranks" ALTER COLUMN "rank" TYPE "public"."rank_old" USING CONCAT(SUBSTR("rank"::"text", 1, 1), SUBSTR("rank"::"text", LENGTH("rank"::"text"), 1))::"public"."rank_old"`);
            yield queryRunner.query(`DROP TYPE "public"."rank"`);
            yield queryRunner.query(`ALTER TYPE "public"."rank_old" RENAME TO "rank"`);
            yield queryRunner.query(`CREATE TYPE "public"."quest_period_old" AS ENUM('day', 'season')`);
            yield queryRunner.query(`ALTER TABLE "quests" ALTER COLUMN "period" TYPE "public"."quest_period_old" USING REPLACE(REPLACE("period"::"text", 'DAILY', 'day'), 'SEASONAL', 'season')::"public"."quest_period_old"`);
            yield queryRunner.query(`DROP TYPE "public"."quest_period"`);
            yield queryRunner.query(`ALTER TYPE "public"."quest_period_old" RENAME TO "quest_period"`);
            yield queryRunner.query(`ALTER TABLE "user_season_rank_claims" ADD CONSTRAINT "FK_f07c0d5dd258518c077b53950f5" FOREIGN KEY ("seasonNumber", "rank") REFERENCES "season_ranks"("seasonNumber","rank") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.enums1693490177571 = enums1693490177571;
//# sourceMappingURL=1693490177571-enums.js.map