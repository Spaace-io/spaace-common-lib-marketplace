import { MigrationInterface, QueryRunner } from 'typeorm';

export class unsigned1678360278914 implements MigrationInterface {
  name = 'unsigned1678360278914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `UPDATE "collections" SET "saleCount" = '0' WHERE "saleCount" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "saleCount" TYPE numeric(78,0)`,
    );
  }
}
