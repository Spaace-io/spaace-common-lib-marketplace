import { MigrationInterface, QueryRunner } from 'typeorm';

export class saleTokenId1673558238452 implements MigrationInterface {
  name = 'saleTokenId1673558238452';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "tokenId" TYPE numeric(78) USING "tokenId"::numeric(78)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "tokenId" TYPE character varying`,
    );
  }
}
