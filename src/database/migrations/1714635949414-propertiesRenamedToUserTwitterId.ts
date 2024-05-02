import { MigrationInterface, QueryRunner } from 'typeorm';

export class PropertiesRenamedToUserTwitterId1714635949414
  implements MigrationInterface
{
  name = 'PropertiesRenamedToUserTwitterId1714635949414';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_d641a417a7c5f296d3146026c9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_fa758204568b13daf3dfee68bdb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_5469c47bdedbfbb4f71bce6687c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" DROP CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_25c80580f78016d01cae153c3e4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b8447028384b073e6bd7b7d006"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" RENAME COLUMN "twitterName" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" RENAME CONSTRAINT "PK_f29328d4c75ca9622bb34ebb272" TO "PK_87a03813428ab4a75d856cef528"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" RENAME COLUMN "twitterUsername" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" RENAME CONSTRAINT "PK_a99b50f2543fb5cab0511c5c4e5" TO "PK_7bc7563040a22027efb5109f6be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" RENAME CONSTRAINT "PK_860df0344b247b7043213c073ed" TO "PK_9baa495e17967a10de54a76484b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" RENAME COLUMN "userTwitter" TO "userTwitterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3cd5e9a2a6827f571ad6d7da60" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") WHERE "completed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_223b6c526f41d87f1804d343f98" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_734f290d8be0311bbca0960870a" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_7bc7563040a22027efb5109f6be" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_68fcfcdec85502e6278199c4c9b" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ADD CONSTRAINT "FK_86c55a1a06538cf396e4dbbd93a" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_81cefd74afdfb6782f323beda48" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_1a4a33bd2284590064dce62fa27" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" DROP CONSTRAINT "FK_1a4a33bd2284590064dce62fa27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" DROP CONSTRAINT "FK_81cefd74afdfb6782f323beda48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" DROP CONSTRAINT "FK_86c55a1a06538cf396e4dbbd93a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" DROP CONSTRAINT "FK_68fcfcdec85502e6278199c4c9b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_7bc7563040a22027efb5109f6be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP CONSTRAINT "FK_734f290d8be0311bbca0960870a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "FK_223b6c526f41d87f1804d343f98"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3cd5e9a2a6827f571ad6d7da60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" RENAME CONSTRAINT "PK_9baa495e17967a10de54a76484b" TO "PK_860df0344b247b7043213c073ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" RENAME CONSTRAINT "PK_7bc7563040a22027efb5109f6be" TO "PK_a99b50f2543fb5cab0511c5c4e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" RENAME COLUMN "userTwitterId" TO "twitterUsername"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" RENAME COLUMN "userTwitterId" TO "userTwitter"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" RENAME CONSTRAINT "PK_87a03813428ab4a75d856cef528" TO "PK_f29328d4c75ca9622bb34ebb272"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" RENAME COLUMN "userTwitterId" TO "twitterName"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b8447028384b073e6bd7b7d006" ON "arena_quest_progress" ("twitterName", "seasonNumber", "questId") WHERE completed`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ADD CONSTRAINT "FK_25c80580f78016d01cae153c3e4" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_claimed_wow_chest" ADD CONSTRAINT "FK_5c3faf5ae66b3bc6767bc9ebed5" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ADD CONSTRAINT "FK_a9f48e07b6999b2a1c333be9828" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_chest_progress_genesis" ADD CONSTRAINT "FK_5469c47bdedbfbb4f71bce6687c" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_a99b50f2543fb5cab0511c5c4e5" FOREIGN KEY ("twitterUsername") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD CONSTRAINT "FK_fa758204568b13daf3dfee68bdb" FOREIGN KEY ("userTwitter") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "FK_d641a417a7c5f296d3146026c9f" FOREIGN KEY ("twitterName") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
