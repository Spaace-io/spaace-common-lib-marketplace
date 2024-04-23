import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminTableAdded1713877718336 implements MigrationInterface {
  name = 'AdminTableAdded1713877718336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_admins" ("twitterUsername" text NOT NULL, "twitterId" text NOT NULL, "twitterPicture" text NOT NULL, "accountCreationDate" TIMESTAMP NOT NULL DEFAULT now(), "twitterSecretToken" text NOT NULL, "twitterAccessToken" text NOT NULL, "walletAddress" text, CONSTRAINT "UQ_8bcd19483ca2f3cce10f5c7c1c5" UNIQUE ("twitterSecretToken"), CONSTRAINT "UQ_9afd302499fb0a4bc6b34ef96f8" UNIQUE ("twitterAccessToken"), CONSTRAINT "PK_22dd9d4a53becb4a0de255e7a16" PRIMARY KEY ("twitterId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_admins"`);
  }
}
