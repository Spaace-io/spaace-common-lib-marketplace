import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpotlightCampaignEvents1767718976357
  implements MigrationInterface
{
  name = 'SpotlightCampaignEvents1767718976357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "spotlight_campaigns" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'spotlight_campaign_event_type_enum') THEN
          CREATE TYPE "public"."spotlight_campaign_event_type_enum" AS ENUM(
            'NEW_RUN',
            'ACTIVATE',
            'DEACTIVATE',
            'UPDATE_CAMPAIGN',
            'UPDATE_RUN'
          );
        END IF;
      END
      $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "spotlight_campaign_events" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "campaignId" uuid NOT NULL,
        "runId" uuid,
        "type" "public"."spotlight_campaign_event_type_enum" NOT NULL,
        "note" text,
        "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
        "createdAt" timestamptz NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_spotlight_campaign_events_id" PRIMARY KEY ("id")
      );
    `);

    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      ADD CONSTRAINT "FK_spotlight_campaign_events_campaign"
      FOREIGN KEY ("campaignId") REFERENCES "spotlight_campaigns"("id")
      ON DELETE CASCADE;
    `);

    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      ADD CONSTRAINT "FK_spotlight_campaign_events_run"
      FOREIGN KEY ("runId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_events_run";
    `);

    await queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_events_campaign";
    `);

    await queryRunner.query(
      `DROP TABLE IF EXISTS "spotlight_campaign_events";`,
    );

    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'spotlight_campaign_event_type_enum') THEN
          DROP TYPE "public"."spotlight_campaign_event_type_enum";
        END IF;
      END
      $$;
    `);
  }
}
