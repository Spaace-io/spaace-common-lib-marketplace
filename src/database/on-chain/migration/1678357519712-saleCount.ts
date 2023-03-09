import { MigrationInterface, QueryRunner } from 'typeorm';

export class saleCount1678357519712 implements MigrationInterface {
  name = 'saleCount1678357519712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount"`,
    );
  }
}
