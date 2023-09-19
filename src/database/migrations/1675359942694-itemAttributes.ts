import { MigrationInterface, QueryRunner } from 'typeorm';

export class itemAttributes1675359942694 implements MigrationInterface {
  name = 'itemAttributes1675359942694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "item_attributes" ("collection" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "trait" text NOT NULL, "value" text NOT NULL, CONSTRAINT "UQ_f3f325a3290043d05e25d9a4d2b" UNIQUE ("trait"), CONSTRAINT "PK_13e5c8a2d8634c46d1591445e61" PRIMARY KEY ("collection", "tokenId"))`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "attributes"`);
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61"`,
    );
    await queryRunner.query(`ALTER TABLE "items" ADD "attributes" jsonb`);
    await queryRunner.query(`DROP TABLE "item_attributes"`);
  }
}
