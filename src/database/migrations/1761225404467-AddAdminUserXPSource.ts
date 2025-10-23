import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminUserXPSource1761225404467 implements MigrationInterface {
  name = 'AddAdminUserXPSource1761225404467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ALTER COLUMN "questId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."user_xp_log_source" ADD VALUE IF NOT EXISTS 'ADMIN'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_xp_log" ALTER COLUMN "questId" SET NOT NULL`,
    );
  }
}
