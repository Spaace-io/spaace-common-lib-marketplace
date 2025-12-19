import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserDiscordRankSync1766058414638 implements MigrationInterface {
  name = 'UserDiscordRankSync1766058414638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE public.discord_tier AS ENUM ('SILVER','GOLD','PLATINUM','DIAMOND');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE "user_discord_rank_sync" (
        "userAddress" character(40) NOT NULL,
        "seasonNumber" text NOT NULL,
        "discordId" text NOT NULL,
        "lastSyncedTier" public.discord_tier,
        "lastSyncedAt" TIMESTAMP WITH TIME ZONE,
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_56a40e383e804c9a14618870d2f" PRIMARY KEY ("userAddress", "seasonNumber")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_d288ace1539e5a1b34ccbfa379"
      ON "user_discord_rank_sync" ("seasonNumber", "updatedAt")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_428617002f42644b64cf7129fe"
      ON "user_discord_rank_sync" ("discordId")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user_discord_rank_sync"`);
    await queryRunner.query(`DROP TYPE IF EXISTS public.discord_tier`);
  }
}
