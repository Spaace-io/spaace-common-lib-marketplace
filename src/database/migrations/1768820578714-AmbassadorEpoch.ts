import { MigrationInterface, QueryRunner } from 'typeorm';

export class AmbassadorEpoch1768820578714 implements MigrationInterface {
  name = 'AmbassadorEpoch1768820578714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ambassador_epoch_results" ("epochId" uuid NOT NULL, "userAddress" character(40) NOT NULL, "rank" integer NOT NULL, "scoreBp" integer NOT NULL, "archivedAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_7e07c61df272f07448fb51f8dc3" PRIMARY KEY ("epochId", "userAddress"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1c7ede652a0cf676d2f98dd339" ON "ambassador_epoch_results" ("epochId", "rank") `,
    );
    await queryRunner.query(
      `CREATE TABLE "ambassador_epoch_leaderboard" ("epochId" uuid NOT NULL, "userAddress" character(40) NOT NULL, "scoreBp" integer NOT NULL, "rank" integer NOT NULL DEFAULT '0', "computedAt" TIMESTAMP NOT NULL DEFAULT NOW(), "referralsCount" integer NOT NULL DEFAULT '0', "tradingVolume" numeric(78) NOT NULL DEFAULT '0', "referralTradingVolume" numeric(78) NOT NULL DEFAULT '0', "xpSum" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_93c30c09f0f4371d814ab7fdb4b" PRIMARY KEY ("epochId", "userAddress"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c65a67f89ce2535dd8fc533249" ON "ambassador_epoch_leaderboard" ("epochId", "rank") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ambassador_epoch_status" AS ENUM('DRAFT', 'SCHEDULED', 'LIVE', 'ENDED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ambassador_epochs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "startAt" TIMESTAMP NOT NULL, "endAt" TIMESTAMP NOT NULL, "rewardPoolUsd" numeric(18,2) NOT NULL, "winnersCount" integer NOT NULL, "status" "public"."ambassador_epoch_status" NOT NULL DEFAULT 'DRAFT', "lastLeaderboardComputedAt" TIMESTAMP, "finalizedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(), "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(), CONSTRAINT "PK_c4e025b2d42f336a206b510ed02" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2684d4435d39c84457035b7caf" ON "ambassador_epochs" ("status", "endAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1af6c7d3f5aba046ea035db3f" ON "ambassador_epochs" ("status", "startAt") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ambassador_epochs"`);
    await queryRunner.query(`DROP TYPE "public"."ambassador_epoch_status"`);
    await queryRunner.query(`DROP TABLE "ambassador_epoch_leaderboard"`);
    await queryRunner.query(`DROP TABLE "ambassador_epoch_results"`);
  }
}
