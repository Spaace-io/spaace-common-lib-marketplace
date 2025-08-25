import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailVerification1755779890370 implements MigrationInterface {
  name = 'AddEmailVerification1755779890370';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "pendingEmail" character varying(255)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_emailstatus_enum" AS ENUM('UNSET', 'PENDING', 'VERIFIED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailStatus" "public"."users_emailstatus_enum" NOT NULL DEFAULT 'UNSET'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailVerifiedAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailVerificationTokenHash" character varying(128)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailVerificationExpiresAt" TIMESTAMP WITH TIME ZONE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "emailVerificationLastSentAt" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "emailVerificationLastSentAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "emailVerificationExpiresAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "emailVerificationTokenHash"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "emailVerifiedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "emailStatus"`);
    await queryRunner.query(`DROP TYPE "public"."users_emailstatus_enum"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pendingEmail"`);
  }
}
