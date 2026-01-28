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
exports.SpotlightCampaignCollections1769606304604 = void 0;
class SpotlightCampaignCollections1769606304604 {
    constructor() {
        this.name = 'SpotlightCampaignCollections1769606304604';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
            yield queryRunner.query(`
      CREATE TABLE "spotlight_campaign_run_collections" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "runId" uuid NOT NULL,
        "seasonNumber" numeric(78) NOT NULL,
        "collectionAddress" char(40) NOT NULL,
        "collectionName" text NOT NULL,
        "isPrimary" boolean NOT NULL DEFAULT false,
        "questId" uuid NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_spotlight_campaign_run_collections_id" PRIMARY KEY ("id")
      )
    `);
            // FK -> spotlight_campaign_runs
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_run_collections"
      ADD CONSTRAINT "FK_spotlight_campaign_run_collections_run"
      FOREIGN KEY ("runId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE CASCADE
    `);
            // FK -> quests composite ("seasonNumber","id")
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_run_collections"
      ADD CONSTRAINT "FK_spotlight_campaign_run_collections_quest"
      FOREIGN KEY ("seasonNumber","questId")
      REFERENCES "quests"("seasonNumber","id")
      ON DELETE RESTRICT
    `);
            // Unique(runId, collectionAddress)
            yield queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_campaign_run_collections_run_collection"
      ON "spotlight_campaign_run_collections" ("runId", "collectionAddress")
    `);
            // Only 1 primary per run (partial unique)
            yield queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_campaign_run_collections_primary_per_run"
      ON "spotlight_campaign_run_collections" ("runId")
      WHERE "isPrimary" = true
    `);
            // Helpful indexes
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_runId"
      ON "spotlight_campaign_run_collections" ("runId")
    `);
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_collectionAddress"
      ON "spotlight_campaign_run_collections" ("collectionAddress")
    `);
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_quest"
      ON "spotlight_campaign_run_collections" ("seasonNumber", "questId")
    `);
            /**
             * 2) spotlight_collection_buy_quests
             * Registry: 1 buy quest per (seasonNumber + collectionAddress) to prevent creating millions of quests.
             */
            yield queryRunner.query(`
      CREATE TABLE "spotlight_collection_buy_quests" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "seasonNumber" numeric(78) NOT NULL,
        "collectionAddress" char(40) NOT NULL,
        "collectionName" text NOT NULL,
        "questId" uuid NOT NULL,
        "createdAt" timestamptz NOT NULL DEFAULT NOW(),
        "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_spotlight_collection_buy_quests_id" PRIMARY KEY ("id")
      )
    `);
            // FK -> quests composite ("seasonNumber","id")
            yield queryRunner.query(`
      ALTER TABLE "spotlight_collection_buy_quests"
      ADD CONSTRAINT "FK_spotlight_collection_buy_quests_quest"
      FOREIGN KEY ("seasonNumber","questId")
      REFERENCES "quests"("seasonNumber","id")
      ON DELETE RESTRICT
    `);
            // Unique(seasonNumber, collectionAddress)
            yield queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_collection_buy_quests_season_collection"
      ON "spotlight_collection_buy_quests" ("seasonNumber", "collectionAddress")
    `);
            // Helpful indexes
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_collectionAddress"
      ON "spotlight_collection_buy_quests" ("collectionAddress")
    `);
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_seasonNumber"
      ON "spotlight_collection_buy_quests" ("seasonNumber")
    `);
            yield queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_quest"
      ON "spotlight_collection_buy_quests" ("seasonNumber", "questId")
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_quest"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_seasonNumber"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_collectionAddress"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "uq_spotlight_collection_buy_quests_season_collection"`);
            yield queryRunner.query(`ALTER TABLE "spotlight_collection_buy_quests" DROP CONSTRAINT IF EXISTS "FK_spotlight_collection_buy_quests_quest"`);
            yield queryRunner.query(`DROP TABLE IF EXISTS "spotlight_collection_buy_quests"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_quest"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_collectionAddress"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_runId"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "uq_spotlight_campaign_run_collections_primary_per_run"`);
            yield queryRunner.query(`DROP INDEX IF EXISTS "uq_spotlight_campaign_run_collections_run_collection"`);
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_run_collections" DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_run_collections_quest"`);
            yield queryRunner.query(`ALTER TABLE "spotlight_campaign_run_collections" DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_run_collections_run"`);
            yield queryRunner.query(`DROP TABLE IF EXISTS "spotlight_campaign_run_collections"`);
        });
    }
}
exports.SpotlightCampaignCollections1769606304604 = SpotlightCampaignCollections1769606304604;
//# sourceMappingURL=1769606304604-SpotlightCampaignCollections.js.map