import { MigrationInterface, QueryRunner } from 'typeorm';

export class notableCollections1686241295922 implements MigrationInterface {
  name = 'notableCollections1686241295922';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notable_collections" ("collection" character(40) NOT NULL, CONSTRAINT "PK_5a76a7e64f51ddc26c6201ff047" PRIMARY KEY ("collection"))`,
    );
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "collection"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "collection" character(40) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "collection"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "collection" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "notable_collections"`);
  }
}
