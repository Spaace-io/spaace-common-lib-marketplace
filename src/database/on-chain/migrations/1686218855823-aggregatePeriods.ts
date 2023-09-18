import { MigrationInterface, QueryRunner } from 'typeorm';

export class aggregatePeriods1686218855823 implements MigrationInterface {
  name = 'aggregatePeriods1686218855823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volume6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "volumeChange6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "floorChange6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "saleCount6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "saleCount1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "floorChange1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange6h"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume6h"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "volumeChange1h"`,
    );
    await queryRunner.query(`ALTER TABLE "collections" DROP COLUMN "volume1h"`);
  }
}
