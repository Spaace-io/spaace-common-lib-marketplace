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
exports.AddTournamentRewardTypes1768560000000 = void 0;
class AddTournamentRewardTypes1768560000000 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "tournaments"
      ADD COLUMN "reward_type" VARCHAR(10) DEFAULT 'XP' CHECK ("reward_type" IN ('XP', 'USD')),
      ADD COLUMN "rewarded_participants_volume_wei" NUMERIC(78),
      ADD COLUMN "bonus_tiers" JSONB DEFAULT '[]'::jsonb
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournaments"
      RENAME COLUMN "total_prize_xp" TO "total_prize_amount"
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      RENAME COLUMN "reward_xp" TO "reward_amount"
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      ALTER COLUMN "reward_amount" DROP NOT NULL
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournament_results"
      RENAME COLUMN "reward_xp" TO "reward_amount"
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournament_results"
      ADD COLUMN "base_reward_amount" NUMERIC
    `);
            // Data migration 2: Fill rewarded_participants_volume_wei for existing tournaments
            // Only sum volume for participants within reward brackets (e.g., Top 50)
            yield queryRunner.query(`
      UPDATE tournaments t
      SET rewarded_participants_volume_wei = (
        SELECT COALESCE(SUM(tr.score), 0)
        FROM tournament_results tr
        WHERE tr.tournament_id = t.id
          AND tr.final_place <= (
            SELECT MAX(trb.place_to)
            FROM tournament_reward_brackets trb
            WHERE trb.tournament_id = t.id
          )
      )
      WHERE t.status IN ('ended', 'calculating')
        AND t.rewarded_participants_volume_wei IS NULL
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Revert in reverse order of up()
            // 5. Remove base_reward_amount from tournament_results
            yield queryRunner.query(`
      ALTER TABLE "tournament_results"
      DROP COLUMN IF EXISTS "base_reward_amount"
    `);
            // 4. Rename reward_amount back to reward_xp in tournament_results
            yield queryRunner.query(`
      ALTER TABLE "tournament_results"
      RENAME COLUMN "reward_amount" TO "reward_xp"
    `);
            // 3. Set reward_amount back to NOT NULL and rename in tournament_reward_brackets
            yield queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      ALTER COLUMN "reward_amount" SET NOT NULL
    `);
            yield queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      RENAME COLUMN "reward_amount" TO "reward_xp"
    `);
            // 2. Rename total_prize_amount back to total_prize_xp
            yield queryRunner.query(`
      ALTER TABLE "tournaments"
      RENAME COLUMN "total_prize_amount" TO "total_prize_xp"
    `);
            // 1. Remove new columns from tournaments
            yield queryRunner.query(`
      ALTER TABLE "tournaments"
      DROP COLUMN IF EXISTS "bonus_tiers",
      DROP COLUMN IF EXISTS "rewarded_participants_volume_wei",
      DROP COLUMN IF EXISTS "reward_type"
    `);
        });
    }
}
exports.AddTournamentRewardTypes1768560000000 = AddTournamentRewardTypes1768560000000;
//# sourceMappingURL=1768560000000-AddTournamentRewardTypes.js.map