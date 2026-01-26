import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBadgeSystem1768200000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enums with IF NOT EXISTS logic
    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'badge_category') THEN
          CREATE TYPE "public"."badge_category" AS ENUM(
            'collector',
            'trading',
            'activity',
            'social',
            'loyalty'
          );
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'badge_rarity') THEN
          CREATE TYPE "public"."badge_rarity" AS ENUM(
            'common',
            'rare',
            'epic',
            'legendary'
          );
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'badge_condition_type') THEN
          CREATE TYPE "public"."badge_condition_type" AS ENUM(
            'BUY_COUNT_ON_SPAACE',
            'BUY_DISTINCT_COLLECTIONS_ON_SPAACE',
            'BUY_SAME_COLLECTION_COUNT',
            'BLUECHIP_BUY_COUNT_ON_SPAACE',
            'SELL_COUNT_ON_SPAACE',
            'SELL_LOSS_ON_SPAACE',
            'LIST_COUNT_ON_SPAACE',
            'TRADING_VOLUME_ETH',
            'QUEST_COMPLETED',
            'QUEST_COMPLETED_COUNT',
            'DAILY_QUEST_STREAK',
            'ACTIVE_REFERRALS_COUNT',
            'CONNECTED_BEFORE_DATE',
            'ACTIVE_DURING_PERIOD'
          );
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'badge_status') THEN
          CREATE TYPE "public"."badge_status" AS ENUM(
            'LOCKED',
            'UNLOCKED',
            'CLAIMED'
          );
        END IF;
      END $$;
    `);

    // Create badges table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "badges" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" varchar(100) NOT NULL UNIQUE,
        "category" "badge_category" NOT NULL,
        "name" varchar(255) NOT NULL,
        "description" text,
        "icon_url" text,
        "is_active" boolean NOT NULL DEFAULT true,
        "is_repeatable" boolean NOT NULL DEFAULT false,
        "max_count" integer DEFAULT 1,
        "sort_order" integer NOT NULL DEFAULT 0,
        "rarity" "badge_rarity" NOT NULL DEFAULT 'common',
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_badges_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badges_code" ON "badges" ("code")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badges_active_category" ON "badges" ("is_active", "category")
    `);

    // Create badge_conditions table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "badge_conditions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "badge_id" uuid NOT NULL,
        "condition_type" "badge_condition_type" NOT NULL,
        "params_json" jsonb NOT NULL DEFAULT '{}',
        "logical_operator" varchar(10) NOT NULL DEFAULT 'AND',
        "condition_group" integer NOT NULL DEFAULT 1,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_badge_conditions_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_badge_conditions_badge_id" FOREIGN KEY ("badge_id") 
          REFERENCES "badges" ("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badge_conditions_badge_id" ON "badge_conditions" ("badge_id")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badge_conditions_type" ON "badge_conditions" ("condition_type")
    `);

    // Create user_badges table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_badges" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_address" varchar(42) NOT NULL,
        "badge_id" uuid NOT NULL,
        "status" "badge_status" NOT NULL DEFAULT 'LOCKED',
        "count" integer NOT NULL DEFAULT 0,
        "unlocked_at" timestamp with time zone,
        "claimed_at" timestamp with time zone,
        "last_evaluated_at" timestamp with time zone,
        "next_evaluation_at" timestamp with time zone,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_badges_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_badges_badge_id" FOREIGN KEY ("badge_id") 
          REFERENCES "badges" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_badges_user_address" FOREIGN KEY ("user_address") 
          REFERENCES "users" ("address") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_badges_user_status" ON "user_badges" ("user_address", "status")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_badges_unlocked_at" ON "user_badges" ("unlocked_at")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_badges_next_eval" ON "user_badges" ("next_evaluation_at")
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_user_badges_user_badge" ON "user_badges" ("user_address", "badge_id")
    `);

    // Create user_featured_badges table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "user_featured_badges" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_address" varchar(42) NOT NULL,
        "position" integer NOT NULL DEFAULT 0,
        "badge_id" uuid NOT NULL,
        "updated_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_user_featured_badges_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_featured_badges_badge_id" FOREIGN KEY ("badge_id") 
          REFERENCES "badges" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_featured_badges_user_address" FOREIGN KEY ("user_address") 
          REFERENCES "users" ("address") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_user_featured_badges_user_position" 
        ON "user_featured_badges" ("user_address", "position")
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_user_featured_badges_user_badge" 
        ON "user_featured_badges" ("user_address", "badge_id")
    `);

    // Create badge_unlock_history table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "badge_unlock_history" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user_address" varchar(42) NOT NULL,
        "badge_id" uuid NOT NULL,
        "unlocked_at" timestamp with time zone NOT NULL,
        "created_at" timestamp with time zone NOT NULL DEFAULT now(),
        CONSTRAINT "PK_badge_unlock_history_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_badge_unlock_history_badge_id" FOREIGN KEY ("badge_id") 
          REFERENCES "badges" ("id") ON DELETE CASCADE,
        CONSTRAINT "FK_badge_unlock_history_user_address" FOREIGN KEY ("user_address") 
          REFERENCES "users" ("address") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badge_unlock_history_user" 
        ON "badge_unlock_history" ("user_address", "created_at")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_badge_unlock_history_badge" 
        ON "badge_unlock_history" ("badge_id", "created_at")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order (важен порядок из-за FK)
    await queryRunner.query(
      `DROP TABLE IF EXISTS "badge_unlock_history" CASCADE`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "user_featured_badges" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "user_badges" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "badge_conditions" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "badges" CASCADE`);

    // Drop enums with CASCADE
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."badge_status" CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."badge_condition_type" CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."badge_rarity" CASCADE`,
    );
    await queryRunner.query(
      `DROP TYPE IF EXISTS "public"."badge_category" CASCADE`,
    );
  }
}
