import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFulfillRemainingQuantities1719818241620
  implements MigrationInterface
{
  name = 'AddFulfillRemainingQuantities1719818241620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_harvests_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_harvests_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'passive_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "passive_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'likes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "likes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_medias_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_medias_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attribute_traits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attribute_traits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "fulfillQuantity" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "remainingQuantity" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" ADD "fulfillQuantity" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" ADD "remainingQuantity" numeric(78) NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "balances" "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "collections" "collection" LEFT JOIN "collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT 1 FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress" AND "order"."tokenId" = "attribute"."tokenId") THEN 1 ELSE 0 END) AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT 1 FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress" AND "order"."tokenId" = "attribute"."tokenId") THEN 1 ELSE 0 END) AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attribute_traits_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attribute_traits_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "items" "item" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'items_view',
        'SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "items" "item" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_medias_view" AS SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "item_medias" "media"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_medias_view',
        'SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "item_medias" "media"',
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
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sales_view',
        'SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "sales" "sale"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "active_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'ACTIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'ACTIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "passive_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'PASSIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'passive_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'PASSIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_harvests_view" AS SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_harvests_view',
        'SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "token_balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "transfers" "transfer"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_transfers_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_transfers_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'token_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "token_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_harvests_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_harvests_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'passive_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "passive_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'active_staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "active_staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'staking_deposits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "staking_deposits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sales_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sales_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'reward_periods_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "reward_periods_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'orders_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "orders_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'likes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "likes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'item_medias_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "item_medias_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'items_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'distributor_rewards_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_balances_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attribute_traits_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attribute_traits_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collection_attributes_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collection_attributes_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'collections_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "collections_view"`);
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'balances_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "balances_view"`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" DROP COLUMN "remainingQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "active_orders_cache" DROP COLUMN "fulfillQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "remainingQuantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP COLUMN "fulfillQuantity"`,
    );
    await queryRunner.query(
      `CREATE VIEW "collections_view" AS SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "public"."notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "public"."collections" "collection" LEFT JOIN "public"."collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collections_view',
        'SELECT "collection"."address" AS "address", "collection"."type" AS "type", "collection"."name" AS "name", "collection"."symbol" AS "symbol", "collection"."imageUrl" AS "imageUrl", "collection"."active" AS "active", "collection"."verified" AS "verified", "collection"."explicit" AS "explicit", "collection"."bannerUrl" AS "bannerUrl", "collection"."description" AS "description", "collection"."deployedAt" AS "deployedAt", "collection"."deployer" AS "deployer", "collection"."links" AS "links", "collection"."lastImport" AS "lastImport", COALESCE("ranking"."volume", 0) AS "volume", COALESCE("ranking"."volume1h", 0) AS "volume1h", COALESCE("ranking"."volume6h", 0) AS "volume6h", COALESCE("ranking"."volume24h", 0) AS "volume24h", COALESCE("ranking"."volume7d", 0) AS "volume7d", COALESCE("ranking"."volume30d", 0) AS "volume30d", COALESCE("ranking"."volume90d", 0) AS "volume90d", COALESCE("ranking"."previousVolume1h", 0) AS "previousVolume1h", COALESCE("ranking"."previousVolume6h", 0) AS "previousVolume6h", COALESCE("ranking"."previousVolume24h", 0) AS "previousVolume24h", COALESCE("ranking"."previousVolume7d", 0) AS "previousVolume7d", COALESCE("ranking"."previousVolume30d", 0) AS "previousVolume30d", COALESCE("ranking"."previousVolume90d", 0) AS "previousVolume90d", "ranking"."floorPrice" AS "floorPrice", "ranking"."previousFloorPrice1h" AS "previousFloorPrice1h", "ranking"."previousFloorPrice6h" AS "previousFloorPrice6h", "ranking"."previousFloorPrice24h" AS "previousFloorPrice24h", "ranking"."previousFloorPrice7d" AS "previousFloorPrice7d", "ranking"."previousFloorPrice30d" AS "previousFloorPrice30d", "ranking"."previousFloorPrice90d" AS "previousFloorPrice90d", COALESCE("ranking"."saleCount", 0) AS "saleCount", COALESCE("ranking"."saleCount1h", 0) AS "saleCount1h", COALESCE("ranking"."saleCount6h", 0) AS "saleCount6h", COALESCE("ranking"."saleCount24h", 0) AS "saleCount24h", COALESCE("ranking"."saleCount7d", 0) AS "saleCount7d", COALESCE("ranking"."saleCount30d", 0) AS "saleCount30d", COALESCE("ranking"."saleCount90d", 0) AS "saleCount90d", COALESCE("ranking"."previousSaleCount1h", 0) AS "previousSaleCount1h", COALESCE("ranking"."previousSaleCount6h", 0) AS "previousSaleCount6h", COALESCE("ranking"."previousSaleCount24h", 0) AS "previousSaleCount24h", COALESCE("ranking"."previousSaleCount7d", 0) AS "previousSaleCount7d", COALESCE("ranking"."previousSaleCount30d", 0) AS "previousSaleCount30d", COALESCE("ranking"."previousSaleCount90d", 0) AS "previousSaleCount90d", COALESCE("ranking"."totalSupply", 0) AS "totalSupply", COALESCE("ranking"."ownerCount", 0) AS "ownerCount", COALESCE("ranking"."listedCount", 0) AS "listedCount", (SELECT EXISTS (SELECT 1 FROM "public"."notable_collections" "notable" WHERE "notable"."collectionAddress" = "collection"."address") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "notable" FROM "public"."collections" "collection" LEFT JOIN "public"."collection_rankings_cache" "ranking" ON "ranking"."address" = "collection"."address"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT 1 FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress" AND "order"."tokenId" = "attribute"."tokenId") THEN 1 ELSE 0 END) AS "listedCount" FROM "public"."item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attributes_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", SUM(CASE WHEN EXISTS (SELECT 1 FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress" AND "order"."tokenId" = "attribute"."tokenId") THEN 1 ELSE 0 END) AS "listedCount" FROM "public"."item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_attribute_traits_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "public"."item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_attribute_traits_view',
        'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", COUNT(DISTINCT "attribute"."valueHash") AS "valueCount", COUNT(DISTINCT "attribute"."tokenId") AS "itemCount" FROM "public"."item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "public"."collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "public"."collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "public"."balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'collection_balances_view',
        'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "public"."collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "public"."collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "public"."balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "distributor_rewards_view" AS SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "public"."distributor_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'distributor_rewards_view',
        'SELECT "reward"."userAddress" AS "userAddress", "reward"."distributor" AS "distributor", "reward"."amount" AS "amount", "reward"."signature" AS "signature", "reward"."timestamp" AS "timestamp", "reward"."harvestTxHash" AS "harvestTxHash", "reward"."harvestLogIdx" AS "harvestLogIdx", "reward"."harvestTimestamp" AS "harvestTimestamp" FROM "public"."distributor_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_medias_view" AS SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "public"."item_medias" "media"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_medias_view',
        'SELECT "media"."id" AS "id", "media"."collectionAddress" AS "collectionAddress", "media"."tokenId" AS "tokenId", "media"."primary" AS "primary", "media"."raw" AS "raw" FROM "public"."item_medias" "media"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "item_attributes_view" AS SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "public"."item_attributes" "attribute"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'item_attributes_view',
        'SELECT "attribute"."collectionAddress" AS "collectionAddress", "attribute"."tokenId" AS "tokenId", "attribute"."traitHash" AS "traitHash", "attribute"."trait" AS "trait", "attribute"."valueHash" AS "valueHash", "attribute"."value" AS "value" FROM "public"."item_attributes" "attribute"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "likes_view" AS SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "public"."collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "public"."collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "public"."likes" "like"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'likes_view',
        'SELECT "like"."id" AS "id", "like"."userAddress" AS "userAddress", "like"."collectionAddress" AS "collectionAddress", "like"."tokenId" AS "tokenId", (SELECT "collection"."description" FROM "public"."collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "public"."collections" "collection" WHERE "collection"."address" = "like"."collectionAddress") AS "name", (SELECT "item"."title" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "title", (SELECT "item"."description" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "like"."collectionAddress" AND "item"."tokenId" = "like"."tokenId") AS "itemDescription" FROM "public"."likes" "like"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "public"."active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "public"."orders" "order"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'orders_view',
        'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "public"."active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "public"."orders" "order"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "reward_periods_view" AS SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "public"."reward_periods" "period"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'reward_periods_view',
        'SELECT "period"."distributor" AS "distributor", "period"."startTime" AS "startTime", "period"."endTime" AS "endTime", "period"."amount" AS "amount", "period"."distributed" AS "distributed" FROM "public"."reward_periods" "period"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "sales_view" AS SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "public"."sales" "sale"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sales_view',
        'SELECT "sale"."txHash" AS "txHash", "sale"."logIdx" AS "logIdx", "sale"."orderHash" AS "orderHash", "sale"."collectionAddress" AS "collectionAddress", "sale"."tokenId" AS "tokenId", "sale"."amount" AS "amount", "sale"."from" AS "from", "sale"."to" AS "to", "sale"."price" AS "price", "sale"."currency" AS "currency", "sale"."marketplace" AS "marketplace", "sale"."timestamp" AS "timestamp" FROM "public"."sales" "sale"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "active_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit" WHERE "deposit"."type" = 'ACTIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'active_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit" WHERE "deposit"."type" = \'ACTIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "passive_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit" WHERE "deposit"."type" = 'PASSIVE'`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'passive_staking_deposits_view',
        'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "public"."staking_deposits" "deposit" WHERE "deposit"."type" = \'PASSIVE\'',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_harvests_view" AS SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "public"."staking_harvests" "harvest"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_harvests_view',
        'SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "public"."staking_harvests" "harvest"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "public"."staking_rewards" "reward"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'staking_rewards_view',
        'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."pool" AS "pool", "reward"."vestingTypeId" AS "vestingTypeId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "public"."staking_rewards" "reward"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_balances_view" AS SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "public"."token_balances" "balance" WHERE "balance"."balance" > 0`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_balances_view',
        'SELECT "balance"."currency" AS "currency", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance" FROM "public"."token_balances" "balance" WHERE "balance"."balance" > 0',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "token_transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "public"."token_transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'token_transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."currency" AS "currency", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "public"."token_transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "transfers_view" AS SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "public"."transfers" "transfer"`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'transfers_view',
        'SELECT "transfer"."txHash" AS "txHash", "transfer"."logIdx" AS "logIdx", "transfer"."from" AS "from", "transfer"."to" AS "to", "transfer"."collectionAddress" AS "collectionAddress", "transfer"."tokenId" AS "tokenId", "transfer"."amount" AS "amount", "transfer"."timestamp" AS "timestamp" FROM "public"."transfers" "transfer"',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "balances_view" AS SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "public"."hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "public"."likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "public"."balances" "balance" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "public"."sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'balances_view',
        'SELECT DISTINCT ON ("balance"."collectionAddress", "balance"."tokenId", "balance"."userAddress") "balance"."collectionAddress" AS "collectionAddress", "balance"."tokenId" AS "tokenId", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", (SELECT "item"."description" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "description", (SELECT "item"."title" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "title", (SELECT EXISTS (SELECT 1 FROM "public"."hidden_items" "hidden" WHERE "hidden"."userAddress" = "balance"."userAddress" AND "hidden"."collectionAddress" = "balance"."collectionAddress" AND "hidden"."tokenId" = "balance"."tokenId") FROM (SELECT 1 AS dummy_column) "dummy_table") AS "hidden", (SELECT "item"."rarityScore" FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityScore", (SELECT CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END FROM "public"."items" "item" WHERE "item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId") AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "public"."likes" "like" WHERE "like"."collectionAddress" = "balance"."collectionAddress" AND "like"."tokenId" = "balance"."tokenId") AS "likeCount" FROM "public"."balances" "balance" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "public"."sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId" WHERE "balance"."balance" > 0 ORDER BY "balance"."collectionAddress" ASC, "balance"."tokenId" ASC, "balance"."userAddress" ASC',
      ],
    );
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "public"."likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "public"."items" "item" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','fff9976782d46cc05630d1f6ebab18b2324d6b14') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "public"."sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC`,
    );
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'items_view',
        'SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."decimals" AS "decimals", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = \'DUTCH_AUCTION\' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "public"."likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "public"."items" "item" LEFT JOIN "public"."collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, CASE WHEN "order"."type" = \'DUTCH_AUCTION\' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = \'BID\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."price" DESC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."collectionAddress", "order"."tokenId") * FROM "public"."active_orders_cache" "order" WHERE "order"."type" = \'ENGLISH_AUCTION\' AND "order"."currency" IN (\'0000000000000000000000000000000000000000\',\'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\',\'fff9976782d46cc05630d1f6ebab18b2324d6b14\') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."collectionAddress" ASC, "order"."tokenId" ASC, "order"."endTime" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "public"."sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "public"."transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."price" DESC',
      ],
    );
  }
}
