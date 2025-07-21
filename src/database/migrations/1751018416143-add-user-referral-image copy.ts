import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1751018416143 implements MigrationInterface {
  name = 'Migrations1751018416143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "sharedReferralImage" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the added columns in reverse order
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "sharedReferralImage"`,
    );
  }
}
