import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaignChestRun1767022318292
  implements MigrationInterface
{
  name = 'SpotlightCampaignChestRun1767022318292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "spotlight_campaign_runs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "campaignId" uuid NOT NULL,
        "validFrom" TIMESTAMP NOT NULL,
        "validTo" TIMESTAMP NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "isCurrent" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_58d3260c4204acfe7b33499e4c7" PRIMARY KEY ("id"),
        CONSTRAINT "FK_spotlight_campaign_runs_campaign"
          FOREIGN KEY ("campaignId")
          REFERENCES "spotlight_campaigns"("id")
          ON DELETE CASCADE
      )
  `);

    await queryRunner.query(`
      CREATE TABLE "partner_chest_tiers" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "campaignRunId" uuid NOT NULL,
        "tierNumber" smallint NOT NULL,
        "thresholdEth" numeric(78,18) NOT NULL DEFAULT '0',
        "label" text,
        "active" boolean NOT NULL DEFAULT true,
        CONSTRAINT "uq_partner_chest_tier_run_number" UNIQUE ("campaignRunId", "tierNumber"),
        CONSTRAINT "PK_747380c4f3b5cf792eb2858cad9" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "partner_chest_user_runs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userAddress" character(40) NOT NULL,
        "campaignRunId" uuid NOT NULL,
        "assignedTierId" uuid NOT NULL,
        "assignedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "holdingsValueEth" numeric(78,18),
        "holdingsValueUsd" numeric(78,2),
        "snapshot" jsonb,
        CONSTRAINT "uq_partner_chest_user_run" UNIQUE ("userAddress", "campaignRunId"),
        CONSTRAINT "PK_59be0c512f40b3ee4d9431cb44d" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_partner_chest_user_runs_campaignRunId"
      ON "partner_chest_user_runs" ("campaignRunId")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_partner_chest_user_runs_userAddress"
      ON "partner_chest_user_runs" ("userAddress")
    `);

    await queryRunner.query(`
      CREATE TYPE "public"."partner_chest_unlock_level_enum"
      AS ENUM('BRONZE_3', 'SILVER_3', 'GOLD_3')
    `);

    await queryRunner.query(`
      CREATE TABLE "partner_chest_claims" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userRunId" uuid NOT NULL,
        "unlockLevel" "public"."partner_chest_unlock_level_enum" NOT NULL,
        "claimedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "uq_partner_chest_claim_user_run_level" UNIQUE ("userRunId", "unlockLevel"),
        CONSTRAINT "PK_92c1eaf59b59d3e6c9c1bdd802b" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_partner_chest_claims_userRunId"
      ON "partner_chest_claims" ("userRunId")
    `);

    // -------------------------
    // Foreign Keys (FK)
    // -------------------------

    // partner_chest_tiers.campaignRunId -> spotlight_campaign_runs.id
    await queryRunner.query(`
      ALTER TABLE "partner_chest_tiers"
      ADD CONSTRAINT "FK_partner_chest_tiers_run"
      FOREIGN KEY ("campaignRunId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE CASCADE
    `);

    // partner_chest_user_runs.userAddress -> users.address
    await queryRunner.query(`
      ALTER TABLE "partner_chest_user_runs"
      ADD CONSTRAINT "FK_partner_chest_user_runs_user"
      FOREIGN KEY ("userAddress") REFERENCES "users"("address")
      ON DELETE CASCADE
    `);

    // partner_chest_user_runs.campaignRunId -> spotlight_campaign_runs.id
    await queryRunner.query(`
      ALTER TABLE "partner_chest_user_runs"
      ADD CONSTRAINT "FK_partner_chest_user_runs_run"
      FOREIGN KEY ("campaignRunId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE CASCADE
    `);

    // partner_chest_user_runs.assignedTierId -> partner_chest_tiers.id
    // RESTRICT is usually safer (can't delete tier if users are assigned)
    await queryRunner.query(`
      ALTER TABLE "partner_chest_user_runs"
      ADD CONSTRAINT "FK_partner_chest_user_runs_tier"
      FOREIGN KEY ("assignedTierId") REFERENCES "partner_chest_tiers"("id")
      ON DELETE RESTRICT
    `);

    // partner_chest_claims.userRunId -> partner_chest_user_runs.id
    await queryRunner.query(`
      ALTER TABLE "partner_chest_claims"
      ADD CONSTRAINT "FK_partner_chest_claims_user_run"
      FOREIGN KEY ("userRunId") REFERENCES "partner_chest_user_runs"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa005c61105a4d99e12a34e1bf"`,
    );
    await queryRunner.query(`DROP TABLE "partner_chest_claims"`);
    await queryRunner.query(
      `DROP TYPE "public"."partner_chest_unlock_level_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_57808805a5bdd519fdd810454a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a250b54f668fdbd1275a29fa23"`,
    );
    await queryRunner.query(`DROP TABLE "partner_chest_user_runs"`);
    await queryRunner.query(`DROP TABLE "partner_chest_tiers"`);
    await queryRunner.query(`DROP TABLE "spotlight_campaign_runs"`);
  }
}
