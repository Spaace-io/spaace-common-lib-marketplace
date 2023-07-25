import { MigrationInterface, QueryRunner } from 'typeorm';

export class referralCode1690300882013 implements MigrationInterface {
  name = 'referralCode1690300882013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "referralCode" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899" UNIQUE ("referralCode")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "timestamp"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_b7f8278f4e89249bb75c9a15899"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "referralCode"`);
  }
}
