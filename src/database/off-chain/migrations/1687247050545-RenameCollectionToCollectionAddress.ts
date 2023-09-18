import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameCollectionToCollectionAddress1687247050545
  implements MigrationInterface
{
  name = 'RenameCollectionToCollectionAddress1687247050545';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notable_collections" RENAME COLUMN "collection" TO "collectionAddress"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notable_collections" RENAME CONSTRAINT "PK_5a76a7e64f51ddc26c6201ff047" TO "PK_b927dbd37a77ed934fcf53d185d"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notable_collections" RENAME CONSTRAINT "PK_b927dbd37a77ed934fcf53d185d" TO "PK_5a76a7e64f51ddc26c6201ff047"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notable_collections" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" RENAME COLUMN "collectionAddress" TO "collection"`,
    );
  }
}
