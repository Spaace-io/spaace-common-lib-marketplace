import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1753870555608 implements MigrationInterface {
  name = 'Migrations1753870555608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_fee_commission" ADD "referrerAddress" character(40) NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "users_fee_commission" ADD CONSTRAINT "unique_address_day" UNIQUE ("address", "day", "referrerAddress")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_fee_commission" DROP COLUMN "referrerAddress"`,
    );

    await queryRunner.query(
      `ALTER TABLE "users_fee_commission" DROP CONSTRAINT "unique_address_day"`,
    );
  }
}
