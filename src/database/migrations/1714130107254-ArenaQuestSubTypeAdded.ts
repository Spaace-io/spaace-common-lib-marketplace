import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaQuestSubTypeAdded1714130107254 implements MigrationInterface {
  name = 'ArenaQuestSubTypeAdded1714130107254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_sub_type" AS ENUM('CREW_ACTION', 'CREW_MEMBERS', 'LEVEL', 'POST_OF_THE_DAY', 'PRIME_POST', 'MENTION_METRICS', 'MENTION', 'ONBOARDING', 'OTHERS')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ADD "subType" "public"."arena_quest_sub_type" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`ALTER TABLE "arena_quests" DROP COLUMN "subType"`);
    await queryRunner.query(`DROP TYPE "public"."arena_quest_sub_type"`);
  }
}
