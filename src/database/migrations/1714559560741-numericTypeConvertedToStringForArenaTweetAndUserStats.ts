import { MigrationInterface, QueryRunner } from 'typeorm';

export class NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741
  implements MigrationInterface
{
  name = 'NumericTypeConvertedToStringForArenaTweetAndUserStats1714559560741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalLikes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalLikes" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReposts"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalReposts" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalReplies" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalQuotes" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalQuotes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalQuotes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReplies"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalReplies" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalReposts"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalReposts" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "totalLikes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "totalLikes" integer NOT NULL`,
    );
  }
}
