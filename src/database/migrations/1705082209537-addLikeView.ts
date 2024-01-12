import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLikeView1705082209537 implements MigrationInterface {
  name = 'AddLikeView1705082209537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE VIEW "likes_view" AS SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'likes_view',
        'SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "likes" "like"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'likes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "likes_view"`);
  }
}
