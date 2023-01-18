import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSale1672663210792 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd"`,
    );
    await queryRunner.query(`DROP TABLE "sales"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "orderHash" character(64) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "collection" character varying, "tokenId" numeric(78), CONSTRAINT "PK_d03e0258136323c7c6154219c38" PRIMARY KEY ("txHash", "logIdx"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
