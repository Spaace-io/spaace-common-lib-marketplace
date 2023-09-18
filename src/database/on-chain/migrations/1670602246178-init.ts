import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1670602246178 implements MigrationInterface {
  name = 'init1670602246178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "tokenId" character varying, "isRefreshed" boolean NOT NULL DEFAULT false, "lastTimeUpdate" TIMESTAMP, "tokenUri" character varying, "attributes" jsonb, "medias" jsonb, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "collectionId" character varying, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "collections" ("id" character varying NOT NULL, "deployedOwner" character varying, "name" character varying, "countOwner" character varying, "symbol" character varying, "totalSupply" integer, "tokenType" character varying, "abi" jsonb, "imageUrl" character varying, "active" boolean NOT NULL DEFAULT true, "verified" boolean NOT NULL DEFAULT false, "explicit" boolean NOT NULL DEFAULT false, "bannerUrl" character varying, "description" character varying, "highOffer" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_4ac36bcb5af17969055999c84e3" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_4ac36bcb5af17969055999c84e3"`,
    );
    await queryRunner.query(`DROP TABLE "collections"`);
    await queryRunner.query(`DROP TABLE "items"`);
  }
}
