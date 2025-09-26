import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddModerationAudit1758893373320 implements MigrationInterface {
  name = 'AddModerationAudit1758893373320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."moderation_action_enum" AS ENUM('BULK_SET_STATUS', 'MANUAL_SET_STATUS', 'ADD_BLACKLIST_ID', 'REMOVE_BLACKLIST_ID')`,
    );
    await queryRunner.query(
      `CREATE TABLE "moderation_audit" ("id" BIGSERIAL NOT NULL, "action" "public"."moderation_action_enum" NOT NULL, "wallet" text, "details" jsonb, "actedBy" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_702d6f65bea017b1d458e54a3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_mod_audit_action" ON "moderation_audit" ("action", "created_at") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."idx_mod_audit_action"`);
    await queryRunner.query(`DROP TABLE "moderation_audit"`);
    await queryRunner.query(`DROP TYPE "public"."moderation_action_enum"`);
  }
}
