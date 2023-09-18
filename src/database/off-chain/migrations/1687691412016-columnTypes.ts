import { MigrationInterface, QueryRunner } from 'typeorm';

export class columnTypes1687691412016 implements MigrationInterface {
  name = 'columnTypes1687691412016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "tokenId" TYPE numeric(78) USING "tokenId"::numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "signature" TYPE text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "signature" TYPE character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ALTER COLUMN "tokenId" TYPE character varying`,
    );
  }
}
