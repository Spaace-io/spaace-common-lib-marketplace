import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommunityPostAdded1716938868557 implements MigrationInterface {
  name = 'CommunityPostAdded1716938868557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "communityPost" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_sub_type" RENAME TO "arena_quest_sub_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type" USING "subType"::"text"::"public"."arena_quest_sub_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type_old"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce88aedfa102b3525512e21c86" ON "arena_spaace_tweet" ("communityPost") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce88aedfa102b3525512e21c86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type_old" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type_old" USING "subType"::"text"::"public"."arena_quest_sub_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_sub_type_old" RENAME TO "arena_quest_sub_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "communityPost"`,
    );
  }
}
