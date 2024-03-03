import { MigrationInterface, QueryRunner } from 'typeorm';

export class TwitterSecretTokenAddedInUserEntity1709451145077
  implements MigrationInterface
{
  name = 'TwitterSecretTokenAddedInUserEntity1709451145077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "twitterSecretToken" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_85642adebf0f867ebb474a473e6" UNIQUE ("twitterSecretToken")`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type" RENAME TO "arena_quest_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT', 'PROGRESSIVE_STREAK')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type" USING "type"::"text"::"public"."arena_quest_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."arena_quest_type_old" AS ENUM('PRIME', 'SPECIAL', 'ONE_SHOT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quests" ALTER COLUMN "type" TYPE "public"."arena_quest_type_old" USING "type"::"text"::"public"."arena_quest_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_quest_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_quest_type_old" RENAME TO "arena_quest_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_85642adebf0f867ebb474a473e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "twitterSecretToken"`,
    );
  }
}
