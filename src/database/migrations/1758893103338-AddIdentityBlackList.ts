import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdentityBlackList1758893103338 implements MigrationInterface {
  name = 'AddIdentityBlackList1758893103338';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."identifier_type_enum" AS ENUM('wallet', 'email', 'discord', 'twitter')`,
    );
    await queryRunner.query(
      `CREATE TABLE "identity_blacklist" ("id" BIGSERIAL NOT NULL, "identifierType" "public"."identifier_type_enum" NOT NULL, "identifierValue" text NOT NULL, "reason" text, "createdBy" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "uq_ibl_type_value" UNIQUE ("identifierType", "identifierValue"), CONSTRAINT "PK_ee75cf4f44901c345b94fdf2d0e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_ibl_type_value" ON "identity_blacklist" ("identifierType", "identifierValue") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_ibl_type_value"`);
    await queryRunner.query(`DROP TABLE "identity_blacklist"`);
    await queryRunner.query(`DROP TYPE "public"."identifier_type_enum"`);
  }
}
