import { MigrationInterface, QueryRunner } from 'typeorm';

export class columnTypes1687691403486 implements MigrationInterface {
  name = 'columnTypes1687691403486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "latest_block" ALTER COLUMN "number" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "name" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "symbol" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "imageUrl" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "bannerUrl" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "description" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "title" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "description" TYPE text`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "tokenUri" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "tokenUri" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "description" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "title" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "description" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "bannerUrl" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "imageUrl" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "symbol" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ALTER COLUMN "name" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "latest_block" ALTER COLUMN "number" TYPE integer`,
    );
  }
}
