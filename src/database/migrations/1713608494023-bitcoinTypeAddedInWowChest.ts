import { MigrationInterface, QueryRunner } from 'typeorm';

export class BitcoinTypeAddedInWowChest1713608494023
  implements MigrationInterface
{
  name = 'BitcoinTypeAddedInWowChest1713608494023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."arena_wow_chest_type" RENAME TO "arena_wow_chest_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_wow_chest_type" AS ENUM('XP', 'TOKEN', 'BOOSTER', 'EMPTY', 'BITCOIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "type" TYPE "public"."arena_wow_chest_type" USING "type"::"text"::"public"."arena_wow_chest_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type_old"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" DROP CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."arena_wow_chest_type_old" AS ENUM('XP', 'TOKEN', 'BOOSTER', 'EMPTY')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "type" TYPE "public"."arena_wow_chest_type_old" USING "type"::"text"::"public"."arena_wow_chest_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."arena_wow_chest_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."arena_wow_chest_type_old" RENAME TO "arena_wow_chest_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ADD CONSTRAINT "UQ_8ec460bf8a57510890cd60fbed2" UNIQUE ("type", "value")`,
    );
  }
}
