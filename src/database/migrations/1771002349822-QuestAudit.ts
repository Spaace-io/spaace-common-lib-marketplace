import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestAudit1771002349822 implements MigrationInterface {
  name = 'QuestAudit1771002349822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      DECLARE
        v text;
        vals text[] := ARRAY[
          'TOKEN_TRANSFER',
          'UNISWAP',
          'TRANSFER',
          'SALE',
          'ORDER',
          'CANCEL_ORDER',
          'FILLED_ORDER',
          'INACTIVE_ORDER',
          'USER',
          'STAKING_DEPOSIT',
          'DISTRIBUTOR_REWARD',
          'USER_QUEST_PROGRESS',
          'REFERRAL',
          'CART_ITEM',
          'USER_INTERACTION',
          'DATA_COMPILED',
          'QUEST_COMPLETED',
          'REFERRER',
          'COLLECTION_ROYALTY',
          'SALE_UPDATED'
        ];
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quest_trigger') THEN
          EXECUTE
            'CREATE TYPE "quest_trigger" AS ENUM (' ||
            array_to_string(
              ARRAY(SELECT quote_literal(x) FROM unnest(vals) AS x),
              ','
            ) ||
            ')';
        ELSE
          FOREACH v IN ARRAY vals LOOP
            IF NOT EXISTS (
              SELECT 1
              FROM pg_enum e
              JOIN pg_type t ON t.oid = e.enumtypid
              WHERE t.typname = 'quest_trigger' AND e.enumlabel = v
            ) THEN
              EXECUTE format('ALTER TYPE "quest_trigger" ADD VALUE %L', v);
            END IF;
          END LOOP;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quest_audit_status') THEN
          CREATE TYPE "quest_audit_status" AS ENUM ('PASSED','FAILED','INDETERMINATE','SKIPPED');
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "quest_audit_events" (
        "id" BIGSERIAL PRIMARY KEY,

        "seasonNumber" NUMERIC(78,0) NOT NULL,
        "userAddress" CHAR(40) NOT NULL,

        "trigger" "quest_trigger" NOT NULL,

        "occurredAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        "processedAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

        "txHash" CHAR(64) NULL,
        "logIdx" NUMERIC(78,0) NULL,

        "orderHash" CHAR(64) NULL,

        "collectionAddress" CHAR(40) NOT NULL,
        "tokenId" NUMERIC(78,0) NOT NULL,

        "marketplace" "marketplace" NULL,

        "payload" JSONB NOT NULL DEFAULT '{}'::jsonb,

        "durationMs" INT NULL,

        "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qae_user_occurred_id"
      ON "quest_audit_events" ("userAddress","occurredAt","id");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qae_user_processed_id"
      ON "quest_audit_events" ("userAddress","processedAt","id");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qae_tx_log"
      ON "quest_audit_events" ("txHash","logIdx")
      WHERE "txHash" IS NOT NULL AND "logIdx" IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qae_orderhash"
      ON "quest_audit_events" ("orderHash")
      WHERE "orderHash" IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "ux_qae_user_tx_log"
      ON "quest_audit_events" ("userAddress","txHash","logIdx")
      WHERE "txHash" IS NOT NULL AND "logIdx" IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "ux_qae_user_trigger_orderhash"
      ON "quest_audit_events" ("userAddress","trigger","orderHash")
      WHERE "orderHash" IS NOT NULL;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "quest_audit_evaluations" (
        "id" BIGSERIAL PRIMARY KEY,

        "eventId" BIGINT NOT NULL,
        CONSTRAINT "fk_qav_event"
          FOREIGN KEY ("eventId")
          REFERENCES "quest_audit_events"("id")
          ON DELETE CASCADE,

        "seasonNumber" NUMERIC(78,0) NOT NULL,
        "userAddress" CHAR(40) NOT NULL,

        "trigger" "quest_trigger" NOT NULL,

        "questId" UUID NOT NULL,
        "questName" TEXT NOT NULL,

        "questType" "quest_type" NOT NULL,
        "period" "quest_period" NOT NULL,

        "status" "quest_audit_status" NOT NULL,

        "awardedPoints" NUMERIC(78,0) NOT NULL DEFAULT '0',
        "multiplier" NUMERIC(78,2) NOT NULL DEFAULT 1.0,

        "userQuestProgressNonce" UUID NULL,
        "questRevision" TEXT NULL,

        "ruleResults" JSONB NOT NULL DEFAULT '[]'::jsonb,

        "createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qav_eventId"
      ON "quest_audit_evaluations" ("eventId");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qav_user_created_id"
      ON "quest_audit_evaluations" ("userAddress","createdAt","id");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qav_quest_created_id"
      ON "quest_audit_evaluations" ("questId","createdAt","id");
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "ix_qav_status_created_id"
      ON "quest_audit_evaluations" ("status","createdAt","id");
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "ux_qav_event_quest"
      ON "quest_audit_evaluations" ("eventId","questId");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qav_status_created_id";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qav_quest_created_id";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qav_user_created_id";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qav_eventId";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "quest_audit_evaluations";`);

    await queryRunner.query(
      `DROP INDEX IF EXISTS "ux_qae_user_trigger_orderhash";`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "ux_qae_user_tx_log";`);

    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qae_orderhash";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qae_tx_log";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qae_user_processed_id";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "ix_qae_user_occurred_id";`);

    await queryRunner.query(`DROP TABLE IF EXISTS "quest_audit_events";`);
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quest_audit_status') THEN
          DROP TYPE "quest_audit_status";
        END IF;
      END $$;
    `);
  }
}
