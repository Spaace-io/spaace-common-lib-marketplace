import { MigrationInterface, QueryRunner } from 'typeorm';

export class CollectionAttributesView1696888894252
  implements MigrationInterface
{
  name = 'CollectionAttributesView1696888894252';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1478d78161a2434a3beab664b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_17d50389119c0c7b23d256658b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_b1478d78161a2434a3beab664b3" PRIMARY KEY ("tokenId", "traitHash", "collectionAddress")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a9502e3dd5540b99b8a927015" ON "item_attributes" ("collectionAddress", "tokenId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `,
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(DISTINCT "attribute"."tokenId") AS "count" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(DISTINCT "attribute"."tokenId") AS "count" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1866bd8ac2446df677ded46be6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a9502e3dd5540b99b8a927015"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" DROP CONSTRAINT "PK_b1478d78161a2434a3beab664b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "item_attributes" ADD CONSTRAINT "PK_17d50389119c0c7b23d256658b8" PRIMARY KEY ("tokenId", "trait", "collectionAddress")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1866bd8ac2446df677ded46be6" ON "item_attributes" ("collectionAddress", "traitHash", "valueHash") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_b1478d78161a2434a3beab664b" ON "item_attributes" ("collectionAddress", "tokenId", "traitHash") `,
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."trait" AS "trait", "attribute"."value" AS "value" FROM "item_attributes" "attribute"',
      ],
    );
  }
}
