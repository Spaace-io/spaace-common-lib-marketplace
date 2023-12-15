import { MigrationInterface, QueryRunner } from 'typeorm';

export class PreviousSaleCount1704214315065 implements MigrationInterface {
  name = 'PreviousSaleCount1704214315065';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fcaa362b8c3937d1f5cc805d3f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fe2a8f3193a24cccffc60e2424"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fbbfbed476454117e04530c07a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ce5c053e2239185f30c8d884c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_28ed632162f3d5b1ba5f371ef1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bb3558573beb8700497d6557b8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f80d0a592738250c9c76141b1a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d286aefb0d7871f95ef66a43a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_59f8f95e453f49b6ef256e9773"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ea0c7f6f87a3693ed54440ce19"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dba99cf285b2752cb9ec89cc22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2ec6280c11877bae9d0af912c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "volumeChange90d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "floorChange90d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousVolume90d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice1h" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice6h" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice24h" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice7d" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice30d" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousFloorPrice90d" numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount1h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount6h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount24h" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount7d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount30d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "previousSaleCount90d" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a90030b5aeb0928bcdcc55cf19" ON "collection_rankings_cache" ("previousSaleCount90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cbb6ec802cc6619ede1e468ae8" ON "collection_rankings_cache" ("previousSaleCount30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f69bf6b8e5aa033c2039c652e" ON "collection_rankings_cache" ("previousSaleCount7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_260239fda621a869ade81670cf" ON "collection_rankings_cache" ("previousSaleCount24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce8a640bfd03f32da7436dc06c" ON "collection_rankings_cache" ("previousSaleCount6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_024347fcfc9d8e48f9c65705d8" ON "collection_rankings_cache" ("previousSaleCount1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1872fcd12e98ec90278c5d34d" ON "collection_rankings_cache" ("previousFloorPrice90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3f1edde9e36fbca871819f861" ON "collection_rankings_cache" ("previousFloorPrice30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_361ac95dbd56e20dbd9d6f93ba" ON "collection_rankings_cache" ("previousFloorPrice7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21347659be38cc7a878e871bc3" ON "collection_rankings_cache" ("previousFloorPrice24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c1bc78ebd9cecc7dca6793060" ON "collection_rankings_cache" ("previousFloorPrice6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf7a5708a0d32c91f98799c174" ON "collection_rankings_cache" ("previousFloorPrice1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6688ed0ceb82e95f6975e14a3e" ON "collection_rankings_cache" ("previousVolume90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d9ba0151823fdcd100d0f81536" ON "collection_rankings_cache" ("previousVolume30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_80dc012d87c3e3261a1a0dcc2b" ON "collection_rankings_cache" ("previousVolume7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ed9f478f54b494990997ba425" ON "collection_rankings_cache" ("previousVolume24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be3febb756fbf3bc6d618dd845" ON "collection_rankings_cache" ("previousVolume6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1823d008c8023b6b0a589b10c" ON "collection_rankings_cache" ("previousVolume1h") `,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a1823d008c8023b6b0a589b10c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be3febb756fbf3bc6d618dd845"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ed9f478f54b494990997ba425"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_80dc012d87c3e3261a1a0dcc2b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d9ba0151823fdcd100d0f81536"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6688ed0ceb82e95f6975e14a3e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf7a5708a0d32c91f98799c174"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c1bc78ebd9cecc7dca6793060"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21347659be38cc7a878e871bc3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_361ac95dbd56e20dbd9d6f93ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c3f1edde9e36fbca871819f861"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1872fcd12e98ec90278c5d34d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_024347fcfc9d8e48f9c65705d8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce8a640bfd03f32da7436dc06c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_260239fda621a869ade81670cf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f69bf6b8e5aa033c2039c652e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cbb6ec802cc6619ede1e468ae8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a90030b5aeb0928bcdcc55cf19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount90d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousSaleCount1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice90d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousFloorPrice1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume90d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume30d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume7d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume6h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" DROP COLUMN "previousVolume1h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange90d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange90d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "floorChange1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange30d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange7d" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange24h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange6h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "collection_rankings_cache" ADD "volumeChange1h" numeric(78,0) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2ec6280c11877bae9d0af912c2" ON "collection_rankings_cache" ("volumeChange90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dba99cf285b2752cb9ec89cc22" ON "collection_rankings_cache" ("floorChange90d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea0c7f6f87a3693ed54440ce19" ON "collection_rankings_cache" ("volumeChange1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_59f8f95e453f49b6ef256e9773" ON "collection_rankings_cache" ("volumeChange6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d286aefb0d7871f95ef66a43a" ON "collection_rankings_cache" ("volumeChange24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f80d0a592738250c9c76141b1a" ON "collection_rankings_cache" ("volumeChange7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bb3558573beb8700497d6557b8" ON "collection_rankings_cache" ("volumeChange30d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_28ed632162f3d5b1ba5f371ef1" ON "collection_rankings_cache" ("floorChange1h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ce5c053e2239185f30c8d884c" ON "collection_rankings_cache" ("floorChange6h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fbbfbed476454117e04530c07a" ON "collection_rankings_cache" ("floorChange24h") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe2a8f3193a24cccffc60e2424" ON "collection_rankings_cache" ("floorChange7d") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fcaa362b8c3937d1f5cc805d3f" ON "collection_rankings_cache" ("floorChange30d") `,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."volumeChange90d", 0) AS "volumeChange90d", "ranking"."floorPrice" AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."floorChange90d", 0) AS "floorChange90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."volumeChange1h", 0) AS "volumeChange1h", COALESCE("ranking"."volumeChange6h", 0) AS "volumeChange6h", COALESCE("ranking"."volumeChange24h", 0) AS "volumeChange24h", COALESCE("ranking"."volumeChange7d", 0) AS "volumeChange7d", COALESCE("ranking"."volumeChange30d", 0) AS "volumeChange30d", COALESCE("ranking"."volumeChange90d", 0) AS "volumeChange90d", "ranking"."floorPrice" AS "floorPrice", COALESCE("ranking"."floorChange1h", 0) AS "floorChange1h", COALESCE("ranking"."floorChange6h", 0) AS "floorChange6h", COALESCE("ranking"."floorChange24h", 0) AS "floorChange24h", COALESCE("ranking"."floorChange7d", 0) AS "floorChange7d", COALESCE("ranking"."floorChange30d", 0) AS "floorChange30d", COALESCE("ranking"."floorChange90d", 0) AS "floorChange90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
  }
}
