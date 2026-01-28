import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaignCollections1769606304604
  implements MigrationInterface
{
  name = 'SpotlightCampaignCollections1769606304604';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

    await queryRunner.query(`
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
    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_run_collections"
      ADD CONSTRAINT "FK_spotlight_campaign_run_collections_run"
      FOREIGN KEY ("runId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE CASCADE
    `);

    // FK -> quests composite ("seasonNumber","id")
    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_run_collections"
      ADD CONSTRAINT "FK_spotlight_campaign_run_collections_quest"
      FOREIGN KEY ("seasonNumber","questId")
      REFERENCES "quests"("seasonNumber","id")
      ON DELETE RESTRICT
    `);

    // Unique(runId, collectionAddress)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_campaign_run_collections_run_collection"
      ON "spotlight_campaign_run_collections" ("runId", "collectionAddress")
    `);

    // Only 1 primary per run (partial unique)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_campaign_run_collections_primary_per_run"
      ON "spotlight_campaign_run_collections" ("runId")
      WHERE "isPrimary" = true
    `);

    // Helpful indexes
    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_runId"
      ON "spotlight_campaign_run_collections" ("runId")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_collectionAddress"
      ON "spotlight_campaign_run_collections" ("collectionAddress")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_campaign_run_collections_quest"
      ON "spotlight_campaign_run_collections" ("seasonNumber", "questId")
    `);

    /**
     * 2) spotlight_collection_buy_quests
     * Registry: 1 buy quest per (seasonNumber + collectionAddress) to prevent creating millions of quests.
     */
    await queryRunner.query(`
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
    await queryRunner.query(`
      ALTER TABLE "spotlight_collection_buy_quests"
      ADD CONSTRAINT "FK_spotlight_collection_buy_quests_quest"
      FOREIGN KEY ("seasonNumber","questId")
      REFERENCES "quests"("seasonNumber","id")
      ON DELETE RESTRICT
    `);

    // Unique(seasonNumber, collectionAddress)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "uq_spotlight_collection_buy_quests_season_collection"
      ON "spotlight_collection_buy_quests" ("seasonNumber", "collectionAddress")
    `);

    // Helpful indexes
    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_collectionAddress"
      ON "spotlight_collection_buy_quests" ("collectionAddress")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_seasonNumber"
      ON "spotlight_collection_buy_quests" ("seasonNumber")
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_spotlight_collection_buy_quests_quest"
      ON "spotlight_collection_buy_quests" ("seasonNumber", "questId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_quest"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_seasonNumber"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_collection_buy_quests_collectionAddress"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq_spotlight_collection_buy_quests_season_collection"`,
    );

    await queryRunner.query(
      `ALTER TABLE "spotlight_collection_buy_quests" DROP CONSTRAINT IF EXISTS "FK_spotlight_collection_buy_quests_quest"`,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS "spotlight_collection_buy_quests"`,
    );

    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_quest"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_collectionAddress"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "idx_spotlight_campaign_run_collections_runId"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq_spotlight_campaign_run_collections_primary_per_run"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "uq_spotlight_campaign_run_collections_run_collection"`,
    );

    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_run_collections" DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_run_collections_quest"`,
    );
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaign_run_collections" DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_run_collections_run"`,
    );

    await queryRunner.query(
      `DROP TABLE IF EXISTS "spotlight_campaign_run_collections"`,
    );
  }
}
