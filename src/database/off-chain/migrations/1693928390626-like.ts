import { MigrationInterface, QueryRunner } from 'typeorm';

export class Like1693928390626 implements MigrationInterface {
  name = 'Like1693928390626';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "likes" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_dd8b4ee8d658dbbc0a9360f28b9" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "likes"`);
  }
}
