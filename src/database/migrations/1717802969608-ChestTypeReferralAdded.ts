import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChestTypeReferralAdded1717802969608 implements MigrationInterface {
  name = 'ChestTypeReferralAdded1717802969608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" ADD "stars" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_chest_name" RENAME TO "arena_chest_name_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_chest_name" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW', 'REFERRAL')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name" USING "name"::"text"::"public"."arena_chest_name"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_chest_name_old"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_chest_name_old" AS ENUM('MYTIC', 'LEGENDARY', 'RARE', 'UNCOMMON', 'COMMON', 'GENESIS', 'CREW')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_chest_points" ALTER COLUMN "name" TYPE "public"."arena_chest_name_old" USING "name"::"text"::"public"."arena_chest_name_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_chest_name"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_chest_name_old" RENAME TO "arena_chest_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_earned_chest" DROP COLUMN "stars"`,
    );
  }
}
