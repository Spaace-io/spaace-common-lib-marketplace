import { MigrationInterface, QueryRunner } from 'typeorm';

export class ReferalCodeInUsers1708436896311 implements MigrationInterface {
  name = 'ReferalCodeInUsers1708436896311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "referralCode" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac" UNIQUE ("referralCode")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_6116a28ce34f6bcb2fb3735f5ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "referralCode"`,
    );
  }
}
