import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTournamentRewardTypes1768560000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "tournaments"
      ADD COLUMN "reward_type" VARCHAR(10) DEFAULT 'XP' CHECK ("reward_type" IN ('XP', 'USD')),
      ADD COLUMN "rewarded_participants_volume_wei" NUMERIC(78),
      ADD COLUMN "bonus_tiers" JSONB DEFAULT '[]'::jsonb
    `);

    await queryRunner.query(`
      ALTER TABLE "tournaments"
      RENAME COLUMN "total_prize_xp" TO "total_prize_amount"
    `);

    await queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      RENAME COLUMN "reward_xp" TO "reward_amount"
    `);

    await queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      ALTER COLUMN "reward_amount" DROP NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "tournament_results"
      RENAME COLUMN "reward_xp" TO "reward_amount"
    `);

    await queryRunner.query(`
      ALTER TABLE "tournament_results"
      ADD COLUMN "base_reward_amount" NUMERIC
    `);

    // Data migration 2: Fill rewarded_participants_volume_wei for existing tournaments
    // Only sum volume for participants within reward brackets (e.g., Top 50)
    await queryRunner.query(`
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert in reverse order of up()

    // 5. Remove base_reward_amount from tournament_results
    await queryRunner.query(`
      ALTER TABLE "tournament_results"
      DROP COLUMN IF EXISTS "base_reward_amount"
    `);

    // 4. Rename reward_amount back to reward_xp in tournament_results
    await queryRunner.query(`
      ALTER TABLE "tournament_results"
      RENAME COLUMN "reward_amount" TO "reward_xp"
    `);

    // 3. Set reward_amount back to NOT NULL and rename in tournament_reward_brackets
    await queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      ALTER COLUMN "reward_amount" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "tournament_reward_brackets"
      RENAME COLUMN "reward_amount" TO "reward_xp"
    `);

    // 2. Rename total_prize_amount back to total_prize_xp
    await queryRunner.query(`
      ALTER TABLE "tournaments"
      RENAME COLUMN "total_prize_amount" TO "total_prize_xp"
    `);

    // 1. Remove new columns from tournaments
    await queryRunner.query(`
      ALTER TABLE "tournaments"
      DROP COLUMN IF EXISTS "bonus_tiers",
      DROP COLUMN IF EXISTS "rewarded_participants_volume_wei",
      DROP COLUMN IF EXISTS "reward_type"
    `);
  }
}
