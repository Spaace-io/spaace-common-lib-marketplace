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
exports.Migrations1765883987000 = void 0;
class Migrations1765883987000 {
    constructor() {
        this.name = 'Migrations1765883987000';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /**
             * NANSEN PARTNER AIRDROP
             */
            // Create enum for Nansen tier
            yield queryRunner.query(`
      CREATE TYPE "nansen_tier" AS ENUM ('Green', 'Ice', 'North', 'Star')
    `);
            // Create enum for reward type
            yield queryRunner.query(`
      CREATE TYPE "nansen_reward_type" AS ENUM ('MULTIPLIER', 'CHEST')
    `);
            // Create enum for chest type
            yield queryRunner.query(`
      CREATE TYPE "nansen_chest_type" AS ENUM ('INITIAL', 'SILVER_BONUS', 'GOLD_BONUS')
    `);
            // Create enum for chest status
            yield queryRunner.query(`
      CREATE TYPE "nansen_chest_status" AS ENUM ('LOCKED', 'UNLOCKED', 'CLAIMED')
    `);
            // Create the nansen_airdrop_participants table
            yield queryRunner.query(`
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
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_participants_wallet" ON "nansen_airdrop_participants" ("walletAddress")`);
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_participants_tier" ON "nansen_airdrop_participants" ("nansenTier")`);
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_participants_reward_type" ON "nansen_airdrop_participants" ("rewardType")`);
            // Create the nansen_mystery_chests table
            yield queryRunner.query(`
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
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_chests_participant" ON "nansen_mystery_chests" ("participantId")`);
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_chests_status" ON "nansen_mystery_chests" ("status")`);
            yield queryRunner.query(`CREATE INDEX "IDX_nansen_chests_type" ON "nansen_mystery_chests" ("chestType")`);
            // Add field to users table to track if they've checked Nansen eligibility
            yield queryRunner.query(`ALTER TABLE "users" ADD "checkedNansenAirdrop" BOOLEAN NOT NULL DEFAULT false`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the field from users table
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "checkedNansenAirdrop"`);
            // Drop indexes from nansen_mystery_chests
            yield queryRunner.query(`DROP INDEX "IDX_nansen_chests_type"`);
            yield queryRunner.query(`DROP INDEX "IDX_nansen_chests_status"`);
            yield queryRunner.query(`DROP INDEX "IDX_nansen_chests_participant"`);
            // Drop nansen_mystery_chests table
            yield queryRunner.query(`DROP TABLE "nansen_mystery_chests"`);
            // Drop indexes from nansen_airdrop_participants
            yield queryRunner.query(`DROP INDEX "IDX_nansen_participants_reward_type"`);
            yield queryRunner.query(`DROP INDEX "IDX_nansen_participants_tier"`);
            yield queryRunner.query(`DROP INDEX "IDX_nansen_participants_wallet"`);
            // Drop nansen_airdrop_participants table
            yield queryRunner.query(`DROP TABLE "nansen_airdrop_participants"`);
            // Drop enums
            yield queryRunner.query(`DROP TYPE "nansen_chest_status"`);
            yield queryRunner.query(`DROP TYPE "nansen_chest_type"`);
            yield queryRunner.query(`DROP TYPE "nansen_reward_type"`);
            yield queryRunner.query(`DROP TYPE "nansen_tier"`);
        });
    }
}
exports.Migrations1765883987000 = Migrations1765883987000;
//# sourceMappingURL=1765883987000-nansen_partner_airdrop.js.map