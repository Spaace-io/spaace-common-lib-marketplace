import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1746523554986 implements MigrationInterface {
  name = 'Migrations1746523554986';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "prime_collections" ("collectionAddress" character(40) NOT NULL, "isPrime" boolean NOT NULL DEFAULT false, "updatedAt" TIMESTAMP, CONSTRAINT "PK_69981a9c4683414ece3931e518a" PRIMARY KEY ("collectionAddress"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "prime_collections"`);
  }
}
