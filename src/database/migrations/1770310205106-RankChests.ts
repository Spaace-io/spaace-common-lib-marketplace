import { MigrationInterface, QueryRunner } from 'typeorm';

export class RankChests1770310205106 implements MigrationInterface {
  name = 'RankChests1770310205106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(
      `CREATE TYPE "public"."rank_chest_state_enum" AS ENUM('CLAIMABLE', 'CLAIMED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "rank_chests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userAddress" character(40) NOT NULL, "seasonNumber" numeric(78) NOT NULL, "rank" "public"."rank" NOT NULL, "state" "public"."rank_chest_state_enum" NOT NULL DEFAULT 'CLAIMABLE', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), "claimedAt" TIMESTAMP WITH TIME ZONE, "createdFrom" text, CONSTRAINT "PK_3b4e9c2af97cfec8f1656c4ccc6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5841dad0d1202a97a61eb246e5" ON "rank_chests" ("userAddress", "seasonNumber", "rank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a01cb0f917f1baf1ff7f845d50" ON "rank_chests" ("userAddress", "seasonNumber", "state", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."rank_chest_xp_outcome_enum" AS ENUM('NONE', 'SMALL', 'MID_LOW', 'MID_HIGH', 'HIGH')`,
    );
    await queryRunner.query(
      `CREATE TABLE "rank_chest_rewards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rankChestId" uuid NOT NULL, "xpOutcome" "public"."rank_chest_xp_outcome_enum" NOT NULL, "baseXp" numeric(78) NOT NULL, "xpValues" jsonb NOT NULL, "xpAmount" numeric(78) NOT NULL, "multiplierValue" numeric(78,2) NOT NULL, "multiplierDurationHours" integer NOT NULL, "startAt" TIMESTAMP WITH TIME ZONE NOT NULL, "endAt" TIMESTAMP WITH TIME ZONE NOT NULL, "xpMultiplierId" integer, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(), CONSTRAINT "REL_2b9af9f25d62978ace869ffb80" UNIQUE ("rankChestId"), CONSTRAINT "PK_eaee18ab8ebb1cdfaa56316b1e2" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`
      ALTER TABLE "rank_chests"
      ADD CONSTRAINT "FK_rank_chests_userAddress"
      FOREIGN KEY ("userAddress") REFERENCES "users"("address")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "rank_chests"
      ADD CONSTRAINT "FK_rank_chests_seasonNumber"
      FOREIGN KEY ("seasonNumber") REFERENCES "seasons"("number")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "rank_chest_rewards"
      ADD CONSTRAINT "FK_rank_chest_rewards_rankChestId"
      FOREIGN KEY ("rankChestId") REFERENCES "rank_chests"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TYPE "public"."user_xp_log_source"
      ADD VALUE IF NOT EXISTS 'RANK_CHEST'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rank_chest_rewards"`);
    await queryRunner.query(`DROP TYPE "public"."rank_chest_xp_outcome_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a01cb0f917f1baf1ff7f845d50"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5841dad0d1202a97a61eb246e5"`,
    );
    await queryRunner.query(`DROP TABLE "rank_chests"`);
    await queryRunner.query(`DROP TYPE "public"."rank_chest_state_enum"`);
  }
}
