import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733143117117 implements MigrationInterface {
  name = 'Migrations1733143117117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS ((SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress")) AND "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS ((SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress")) AND "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS (SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress") AND "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS (SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress") AND "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
  }
}
