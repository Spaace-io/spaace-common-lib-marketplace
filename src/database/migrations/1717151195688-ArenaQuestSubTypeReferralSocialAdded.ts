import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaQuestSubTypeReferralSocialAdded1717151195688
  implements MigrationInterface
{
  name = 'ArenaQuestSubTypeReferralSocialAdded1717151195688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_sub_type" RENAME TO "arena_quest_sub_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'REFERRAL_SOCIAL', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type" USING "subType"::"text"::"public"."arena_quest_sub_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type_old"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type_old" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'COMMUNITY_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "subType" TYPE "public"."arena_quest_sub_type_old" USING "subType"::"text"::"public"."arena_quest_sub_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_sub_type_old" RENAME TO "arena_quest_sub_type"`,
    );
  }
}
