import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserStatus1758892846542 implements MigrationInterface {
  name = 'AddUserStatus1758892846542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'REVIEW', 'BLACKLIST', 'DELETED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "status" "public"."users_status_enum" NOT NULL DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "abuseScore" integer`);
    await queryRunner.query(`ALTER TABLE "users" ADD "abuseReason" text`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "statusUpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_users_status" ON "users" ("status") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_users_status"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "statusUpdatedAt"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "abuseReason"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "abuseScore"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
  }
}
