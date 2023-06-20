import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCollectionToCollectionAddress1687247114729
  implements MigrationInterface
{
  name = 'RenameCollectionToCollectionAddress1687247114729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" DROP CONSTRAINT "FK_5bb5a35d14dacbc693cbc088d5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" RENAME CONSTRAINT "PK_4b8decd338cc6c75234f320c0bc" TO "PK_17d50389119c0c7b23d256658b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" RENAME CONSTRAINT "PK_6e28cea27b3667af77a587ef45b" TO "PK_77a2ad67a01059ccd7e3b6df3ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME CONSTRAINT "PK_54ecc4c7a0d91741a58794a2fb7" TO "PK_70222dd18791828bd64ca2552e2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" RENAME CONSTRAINT "PK_e31fcbe59ec356142d99146c5ef" TO "PK_af745151659fc2b3ae3b81ca9d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "FK_5a9502e3dd5540b99b8a9270154" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_2bfde47c481cca182def5607932" FOREIGN KEY ("collectionAddress") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD CONSTRAINT "FK_729615ba2ccd561e1c16766b2e1" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_63d21f3e4098e162b23be15e193" FOREIGN KEY ("collectionAddress", "tokenId") REFERENCES "items"("collectionAddress","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_63d21f3e4098e162b23be15e193"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" DROP CONSTRAINT "FK_729615ba2ccd561e1c16766b2e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_2bfde47c481cca182def5607932"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "FK_5a9502e3dd5540b99b8a9270154"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" RENAME CONSTRAINT "PK_af745151659fc2b3ae3b81ca9d7" TO "PK_e31fcbe59ec356142d99146c5ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME CONSTRAINT "PK_70222dd18791828bd64ca2552e2" TO "PK_54ecc4c7a0d91741a58794a2fb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" RENAME CONSTRAINT "PK_77a2ad67a01059ccd7e3b6df3ec" TO "PK_6e28cea27b3667af77a587ef45b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" RENAME CONSTRAINT "PK_17d50389119c0c7b23d256658b8" TO "PK_4b8decd338cc6c75234f320c0bc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfers" ADD CONSTRAINT "FK_5bb5a35d14dacbc693cbc088d5c" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_b86a58acecb0ac6cbbcfd519844" FOREIGN KEY ("collection") REFERENCES "collections"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "FK_13e5c8a2d8634c46d1591445e61" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
