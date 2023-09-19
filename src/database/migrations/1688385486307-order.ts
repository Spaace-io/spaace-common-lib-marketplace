import { MigrationInterface, QueryRunner } from 'typeorm';

export class order1688385486307 implements MigrationInterface {
  name = 'order1688385486307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("hash" character(64) NOT NULL, "user" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78), "isAsk" boolean NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_4d54235958f3b7b154936769387" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_e906373f7aa5e6fbfe8700f6bd2" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_e906373f7aa5e6fbfe8700f6bd2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_4d54235958f3b7b154936769387"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
