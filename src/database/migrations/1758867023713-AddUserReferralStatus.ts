import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserReferralStatus1758867023713 implements MigrationInterface {
  name = 'AddUserReferralStatus1758867023713';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "referralStatus" character varying(32)`,
    );

    await queryRunner.query(`
     UPDATE "users"
      SET "referralStatus" = CASE
      WHEN "referrerAddress" IS NOT NULL THEN 'pending'
      ELSE NULL
      END
      WHERE "referralStatus" IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referralStatus"`);
  }
}
