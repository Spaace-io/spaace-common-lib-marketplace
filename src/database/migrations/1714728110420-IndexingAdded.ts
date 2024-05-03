import { MigrationInterface, QueryRunner } from 'typeorm';

export class IndexingAdded1714728110420 implements MigrationInterface {
  name = 'IndexingAdded1714728110420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5369e233e18e92fecb08b7991a" ON "arena_users" ("twitterUsername") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6116a28ce34f6bcb2fb3735f5a" ON "arena_users" ("referralCode") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0cece92ebcf29a89687133a476" ON "arena_users" ("crewName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_adbe3f13cde72d3e0e59cc2745" ON "arena_users_progress" ("rank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d28e5a1d308eeba7eb74223b3" ON "arena_users_progress" ("twentyFourHourRank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0bf4352e67a4f9082b2d879390" ON "arena_users_progress" ("division", "league", "leagueRank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b24ff8e11120eba8598149a0b" ON "arena_users_earned_chest" ("userTwitterId", "id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53feb0270ffc58e7ed5f1f0ae4" ON "arena_crews" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84bde20a3cea54eb69312a7868" ON "arena_crew_progress" ("stars") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_46ba2feb436b75b81849164b9a" ON "arena_crew_progress" ("rank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c511f9ef0a4a2e41cec14153df" ON "arena_crew_progress" ("twentyFourHourRank") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7470b0c6f0e975f478662a660b" ON "arena_spaace_tweet" ("postOfTheDay") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d02aaa5d3b3eda8e962da3a938" ON "arena_spaace_tweet" ("primePost") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c85ab52359178efe108bec82aa" ON "arena_spaace_tweet" ("onboardingPost") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_07accd2c97ad4cab9b5ddbeb07" ON "arena_tweet" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c0810a60411cef26ad2362748e" ON "arena_tweet" ("text") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_86c55a1a06538cf396e4dbbd93" ON "arena_user_stars_tracking" ("userTwitterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e6c6386c1872b76c624596129" ON "arena_users_claimed_wow_chest" ("chestPeriod", "userTwitterId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d88598a9b134a17250fd0761fd" ON "arena_users_booster" ("userTwitterId", "seasonNumber", "expiresOn") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d88598a9b134a17250fd0761fd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3e6c6386c1872b76c624596129"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_86c55a1a06538cf396e4dbbd93"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c0810a60411cef26ad2362748e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_07accd2c97ad4cab9b5ddbeb07"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c85ab52359178efe108bec82aa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d02aaa5d3b3eda8e962da3a938"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7470b0c6f0e975f478662a660b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c511f9ef0a4a2e41cec14153df"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_46ba2feb436b75b81849164b9a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84bde20a3cea54eb69312a7868"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_53feb0270ffc58e7ed5f1f0ae4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8b24ff8e11120eba8598149a0b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0bf4352e67a4f9082b2d879390"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9d28e5a1d308eeba7eb74223b3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_adbe3f13cde72d3e0e59cc2745"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0cece92ebcf29a89687133a476"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6116a28ce34f6bcb2fb3735f5a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5369e233e18e92fecb08b7991a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
  }
}
