import { MigrationInterface, QueryRunner } from 'typeorm';

export class order1688388621733 implements MigrationInterface {
  name = 'order1688388621733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("hash" character(64) NOT NULL, "user" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78), "isAsk" boolean NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP, "counter" numeric(78) NOT NULL, "signature" text NOT NULL, CONSTRAINT "PK_13ab9c024e81573c05451b9004f" PRIMARY KEY ("hash"))`,
    );
  }
}
