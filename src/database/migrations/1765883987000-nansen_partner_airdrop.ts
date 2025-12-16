import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1765883987000 implements MigrationInterface {
  name = 'Migrations1765883987000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    /**
     * NANSEN PARTNER AIRDROP
     */

    // Create enum for Nansen tier
    await queryRunner.query(`
      CREATE TYPE "nansen_tier" AS ENUM ('Green', 'Ice', 'North', 'Star')
    `);

    // Create enum for reward type
    await queryRunner.query(`
      CREATE TYPE "nansen_reward_type" AS ENUM ('MULTIPLIER', 'CHEST')
    `);

    // Create enum for chest type
    await queryRunner.query(`
      CREATE TYPE "nansen_chest_type" AS ENUM ('INITIAL', 'SILVER_BONUS', 'GOLD_BONUS')
    `);

    // Create enum for chest status
    await queryRunner.query(`
      CREATE TYPE "nansen_chest_status" AS ENUM ('LOCKED', 'UNLOCKED', 'CLAIMED')
    `);

    // Create the nansen_airdrop_participants table
    await queryRunner.query(`
      CREATE TABLE "nansen_airdrop_participants" (
        "id" SERIAL NOT NULL,
        "walletAddress" VARCHAR(42) NOT NULL,
        "nansenTier" "nansen_tier" NOT NULL,
        "rewardType" "nansen_reward_type" NOT NULL,
        
        -- Multiplier fields (for green tier)
        "multiplierValue" NUMERIC(4,2),
        "multiplierActivatedAt" TIMESTAMP,
        "multiplierExpiresAt" TIMESTAMP,
        
        -- Tweet validation
        "requiresTweet" BOOLEAN NOT NULL DEFAULT false,
        "tweetUrl" TEXT,
        "tweetVerifiedAt" TIMESTAMP,
        
        -- Meta
        "eligibilityCheckedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        "nansenApiResponse" JSONB,
        "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
        
        CONSTRAINT "PK_nansen_airdrop_participants_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_nansen_airdrop_participants_wallet" UNIQUE ("walletAddress"),
        
        -- Ensure proper fields are set based on reward type
        CONSTRAINT "CHK_nansen_reward_type_fields" CHECK (
          ("rewardType" = 'MULTIPLIER' AND "multiplierValue" IS NOT NULL) OR
          ("rewardType" = 'CHEST')
        )
      )
    `);

    // Create indexes on nansen_airdrop_participants
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_participants_wallet" ON "nansen_airdrop_participants" ("walletAddress")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_participants_tier" ON "nansen_airdrop_participants" ("nansenTier")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_participants_reward_type" ON "nansen_airdrop_participants" ("rewardType")`,
    );

    // Create the nansen_mystery_chests table
    await queryRunner.query(`
      CREATE TABLE "nansen_mystery_chests" (
        "id" SERIAL NOT NULL,
        "participantId" INTEGER NOT NULL,
        "chestType" "nansen_chest_type" NOT NULL,
        "unlockRequirement" "rank",
        "status" "nansen_chest_status" NOT NULL DEFAULT 'LOCKED',
        "unlockedAt" TIMESTAMP,
        "claimedAt" TIMESTAMP,
        
        CONSTRAINT "PK_nansen_mystery_chests_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_nansen_mystery_chests_participant_type" UNIQUE ("participantId", "chestType"),
        CONSTRAINT "FK_nansen_mystery_chests_participant" FOREIGN KEY ("participantId") 
          REFERENCES "nansen_airdrop_participants"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        
        -- Ensure chest number is valid (1-3)
        CONSTRAINT "CHK_nansen_chest_type_valid" CHECK (
          "chestType" IN ('INITIAL', 'SILVER_BONUS', 'GOLD_BONUS')
        )
      )
    `);

    // Create indexes on nansen_mystery_chests
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_chests_participant" ON "nansen_mystery_chests" ("participantId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_chests_status" ON "nansen_mystery_chests" ("status")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_nansen_chests_type" ON "nansen_mystery_chests" ("chestType")`,
    );

    // Add field to users table to track if they've checked Nansen eligibility
    await queryRunner.query(
      `ALTER TABLE "users" ADD "checkedNansenAirdrop" BOOLEAN NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the field from users table
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "checkedNansenAirdrop"`,
    );

    // Drop indexes from nansen_mystery_chests
    await queryRunner.query(`DROP INDEX "IDX_nansen_chests_type"`);
    await queryRunner.query(`DROP INDEX "IDX_nansen_chests_status"`);
    await queryRunner.query(`DROP INDEX "IDX_nansen_chests_participant"`);

    // Drop nansen_mystery_chests table
    await queryRunner.query(`DROP TABLE "nansen_mystery_chests"`);

    // Drop indexes from nansen_airdrop_participants
    await queryRunner.query(`DROP INDEX "IDX_nansen_participants_reward_type"`);
    await queryRunner.query(`DROP INDEX "IDX_nansen_participants_tier"`);
    await queryRunner.query(`DROP INDEX "IDX_nansen_participants_wallet"`);

    // Drop nansen_airdrop_participants table
    await queryRunner.query(`DROP TABLE "nansen_airdrop_participants"`);

    // Drop enums
    await queryRunner.query(`DROP TYPE "nansen_chest_status"`);
    await queryRunner.query(`DROP TYPE "nansen_chest_type"`);
    await queryRunner.query(`DROP TYPE "nansen_reward_type"`);
    await queryRunner.query(`DROP TYPE "nansen_tier"`);
  }
}
