import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cart1693927924725 implements MigrationInterface {
  name = 'Cart1693927924725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cart_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_a0df34081b7a800e85cd78cfce3" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cart_items"`);
  }
}
