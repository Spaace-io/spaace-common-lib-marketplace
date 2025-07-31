import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1753870555607 implements MigrationInterface {
  name = 'Migrations1753870555607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "volume24h" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "volume7d" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "volume30d" numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" ADD "volumeAllTime" numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "volumeAllTime"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "volume30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "volume7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prime_collections" DROP COLUMN "volume24h"`,
    );
  }
}
