import { MigrationInterface, QueryRunner } from 'typeorm';

export class hiddenItems1689792471987 implements MigrationInterface {
  name = 'hiddenItems1689792471987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "hidden_items" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, CONSTRAINT "PK_c84aeceb104a1a0f0e923e1ab15" PRIMARY KEY ("userAddress", "collectionAddress", "tokenId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "hidden_items" ADD CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c" FOREIGN KEY ("userAddress") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hidden_items" DROP CONSTRAINT "FK_5915f5cb8c8c7e62c44ac97c97c"`,
    );
    await queryRunner.query(`DROP TABLE "hidden_items"`);
  }
}
