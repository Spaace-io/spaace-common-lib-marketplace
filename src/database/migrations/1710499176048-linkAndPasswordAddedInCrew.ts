import { MigrationInterface, QueryRunner } from 'typeorm';

export class LinkAndPasswordAddedInCrew1710499176048
  implements MigrationInterface
{
  name = 'LinkAndPasswordAddedInCrew1710499176048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crews" ADD "link" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crews" ADD "password" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type" RENAME TO "arena_quest_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE', 'CREW')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type" USING "type"::"text"::"public"."arena_quest_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type_old" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK', 'PROGRESSIVE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type_old" USING "type"::"text"::"public"."arena_quest_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type_old" RENAME TO "arena_quest_type"`,
    );
    await queryRunner.query(`ALTER TABLE "arena_crews" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "arena_crews" DROP COLUMN "link"`);
  }
}
