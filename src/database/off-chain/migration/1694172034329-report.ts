import { MigrationInterface, QueryRunner } from 'typeorm';

export class Report1694172034329 implements MigrationInterface {
  name = 'Report1694172034329';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reports" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_66592117509d55235181645b336" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "reports"`);
  }
}
