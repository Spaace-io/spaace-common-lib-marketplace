import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoyaltyCollection1759311886989 implements MigrationInterface {
  name = 'AddRoyaltyCollection1759311886989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_royalty_collections" ("userAddress" character(40) NOT NULL, "collectionAddress" character(40) NOT NULL, "firstPaidAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "totalRoyaltyWei" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_855574ef1b37510022eae960c5b" PRIMARY KEY ("userAddress", "collectionAddress"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_collection_royalty_track_block" ("id" SERIAL NOT NULL, "lastProcessedId" bigint NOT NULL DEFAULT '0', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6170230542725403d5d6968c9a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "sales" ADD "id" BIGSERIAL NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "id"`);
    await queryRunner.query(`DROP TABLE "user_collection_royalty_track_block"`);
    await queryRunner.query(`DROP TABLE "user_royalty_collections"`);
  }
}
