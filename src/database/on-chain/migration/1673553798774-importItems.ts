import { MigrationInterface, QueryRunner } from 'typeorm';

export class importItems1673553798774 implements MigrationInterface {
  name = 'importItems1673553798774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "importItems" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" ADD "lastImport" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "lastImport" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "lastImport"`);
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "lastImport"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collections" DROP COLUMN "importItems"`,
    );
  }
}
