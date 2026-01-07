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
exports.SpotlightCampaignEvents1767718976357 = void 0;
class SpotlightCampaignEvents1767718976357 {
    constructor() {
        this.name = 'SpotlightCampaignEvents1767718976357';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "spotlight_campaigns" DROP COLUMN "metadata"`);
            yield queryRunner.query(`
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
            yield queryRunner.query(`
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
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      ADD CONSTRAINT "FK_spotlight_campaign_events_campaign"
      FOREIGN KEY ("campaignId") REFERENCES "spotlight_campaigns"("id")
      ON DELETE CASCADE;
    `);
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      ADD CONSTRAINT "FK_spotlight_campaign_events_run"
      FOREIGN KEY ("runId") REFERENCES "spotlight_campaign_runs"("id")
      ON DELETE SET NULL;
    `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_events_run";
    `);
            yield queryRunner.query(`
      ALTER TABLE "spotlight_campaign_events"
      DROP CONSTRAINT IF EXISTS "FK_spotlight_campaign_events_campaign";
    `);
            yield queryRunner.query(`DROP TABLE IF EXISTS "spotlight_campaign_events";`);
            yield queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'spotlight_campaign_event_type_enum') THEN
          DROP TYPE "public"."spotlight_campaign_event_type_enum";
        END IF;
      END
      $$;
    `);
        });
    }
}
exports.SpotlightCampaignEvents1767718976357 = SpotlightCampaignEvents1767718976357;
//# sourceMappingURL=1767718976357-SpotlightCampaignEvents.js.map