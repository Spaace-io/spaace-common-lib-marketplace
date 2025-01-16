import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1736888754517 implements MigrationInterface {
  name = 'Migrations1736888754517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create or replace view items_view
            ("collectionAddress", "tokenId", title, description, "tokenUri", "numberOfCopies", "rarityRanking",
             "rarityScore", "lastImport", "rarityBasisPoints", "buyNowPrice", "buyNowPerUnitPrice", "buyNowStartTime",
             "sellNowPrice", "sellNowPerUnitPrice", "sellNowStartTime", "auctionPerUnitPrice", "auctionPrice",
             "auctionEndTime", "lastSalePrice", "lastSaleTimestamp", "mintTimestamp", "lastTransferTimestamp",
             "likeCount", "marketplaces")
as
SELECT DISTINCT ON (item."collectionAddress", item."tokenId") item."collectionAddress",
                                                              item."tokenId",
                                                              item.title,
                                                              item.description,
                                                              item."tokenUri",
                                                              item."numberOfCopies",
                                                              item."rarityRanking",
                                                              item."rarityScore",
                                                              item."lastImport",
                                                              CASE
                                                                  WHEN item."rarityRanking" IS NOT NULL AND
                                                                       collection."totalSupply" > 0::numeric THEN
                                                                      10000::numeric -
                                                                      item."rarityRanking" * 10000::numeric /
                                                                      collection."totalSupply"
                                                                  ELSE NULL::numeric
                                                                  END                                                       AS "rarityBasisPoints",
                                                              CASE
                                                                  WHEN "buyNow".type = 'DUTCH_AUCTION'::order_type THEN
                                                                      "buyNow"."startingPrice" -
                                                                      ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") *
                                                                      EXTRACT(epoch FROM now() -
                                                                                         "buyNow"."startTime"::timestamp with time zone) /
                                                                      EXTRACT(epoch FROM "buyNow"."endTime" - "buyNow"."startTime")
                                                                  ELSE "buyNow".price
                                                                  END                                                       AS "buyNowPrice",
                                                              CASE
                                                                  WHEN "buyNow".type = 'DUTCH_AUCTION'::order_type THEN
                                                                      "buyNow"."startingPrice" -
                                                                      ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") *
                                                                      EXTRACT(epoch FROM now() -
                                                                                         "buyNow"."startTime"::timestamp with time zone) /
                                                                      EXTRACT(epoch FROM "buyNow"."endTime" - "buyNow"."startTime")
                                                                  ELSE "buyNow"."perUnitPrice"
                                                                  END                                                       AS "buyNowPerUnitPrice",
                                                              "buyNow"."startTime"                                          AS "buyNowStartTime",
                                                              "sellNow".price                                               AS "sellNowPrice",
                                                              "sellNow"."perUnitPrice"                                      AS "sellNowPerUnitPrice",
                                                              "sellNow"."startTime"                                         AS "sellNowStartTime",
                                                              CASE
                                                                  WHEN auction.hash IS NOT NULL
                                                                      THEN GREATEST("sellNow"."perUnitPrice", auction."perUnitPrice")
                                                                  ELSE NULL::numeric
                                                                  END                                                       AS "auctionPerUnitPrice",
                                                              CASE
                                                                  WHEN auction.hash IS NOT NULL
                                                                      THEN GREATEST("sellNow".price, auction.price)
                                                                  ELSE NULL::numeric
                                                                  END                                                       AS "auctionPrice",
                                                              auction."endTime"                                             AS "auctionEndTime",
                                                              "lastSale".price                                              AS "lastSalePrice",
                                                              "lastSale"."timestamp"                                        AS "lastSaleTimestamp",
                                                              mint."timestamp"                                              AS "mintTimestamp",
                                                              "lastTransfer"."timestamp"                                    AS "lastTransferTimestamp",
                                                              (SELECT count(*) AS count
                                                               FROM likes "like"
                                                               WHERE "like"."collectionAddress" = item."collectionAddress"
                                                                 AND "like"."tokenId" = item."tokenId")                     AS "likeCount",
                                                              (SELECT coalesce(array_agg(DISTINCT marketplace), '{}')
                                                               FROM active_orders_cache orders
                                                                        JOIN orders_items ON orders.hash = orders_items.hash
                                                               WHERE orders_items."tokenId" = item."tokenId"
                                                                 AND orders."collectionAddress" = item."collectionAddress") AS "marketplaces"
FROM items item
         LEFT JOIN collection_rankings_cache collection ON collection.address = item."collectionAddress"
         LEFT JOIN (SELECT DISTINCT ON ("order".hash) "order".hash,
                                                      "order"."userAddress",
                                                      "order"."collectionAddress",
                                                      "order".type,
                                                      "order".marketplace,
                                                      "order".price,
                                                      "order"."startingPrice",
                                                      "order".currency,
                                                      "order"."marketplaceFeeBps",
                                                      "order"."marketplaceFeeReceiver",
                                                      "order"."royaltiesBps",
                                                      "order"."startingRoyalties",
                                                      "order"."royaltiesReceiver",
                                                      "order"."startTime",
                                                      "order"."endTime",
                                                      "order".counter,
                                                      "order".signature,
                                                      "order".salt,
                                                      "order".zone,
                                                      "order"."conduitKey",
                                                      "order"."protocolAddress",
                                                      "order"."cancelTxHash",
                                                      "order"."cancelLogIdx",
                                                      "order"."cancelTimestamp",
                                                      "order"."fulfillQuantity",
                                                      "order"."remainingQuantity",
                                                      "order"."perUnitPrice",
                                                      (SELECT array_agg(orders_items."tokenId")::text[] AS "tokenIds"
                                                       FROM orders_items orders_items
                                                       WHERE orders_items.hash = "order".hash) AS "tokenIds"
                    FROM active_orders_cache "order"
                    WHERE ("order".type = ANY (ARRAY ['ASK'::order_type, 'DUTCH_AUCTION'::order_type]))
                      AND ("order".currency = ANY
                           (ARRAY ['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, '7b79995e5f793a07bc00c21412e50ecae098e7f9'::bpchar]))
                      AND ("order"."endTime" > now() OR "order"."endTime" IS NULL)
                    ORDER BY "order".hash,
                             (
                                 CASE
                                     WHEN "order".type = 'DUTCH_AUCTION'::order_type THEN "order"."startingPrice" -
                                                                                          ("order"."startingPrice" - "order"."perUnitPrice") *
                                                                                          EXTRACT(epoch FROM now() -
                                                                                                             "order"."startTime"::timestamp with time zone) /
                                                                                          EXTRACT(epoch FROM "order"."endTime" - "order"."startTime")
                                     ELSE "order"."perUnitPrice"
                                     END), "order".marketplace) "buyNow"
                   ON "buyNow"."collectionAddress" = item."collectionAddress" AND
                      (item."tokenId"::text = ANY ("buyNow"."tokenIds"))
         LEFT JOIN (SELECT DISTINCT ON ("order".hash) "order".hash,
                                                      "order"."userAddress",
                                                      "order"."collectionAddress",
                                                      "order".type,
                                                      "order".marketplace,
                                                      "order".price,
                                                      "order"."startingPrice",
                                                      "order".currency,
                                                      "order"."marketplaceFeeBps",
                                                      "order"."marketplaceFeeReceiver",
                                                      "order"."royaltiesBps",
                                                      "order"."startingRoyalties",
                                                      "order"."royaltiesReceiver",
                                                      "order"."startTime",
                                                      "order"."endTime",
                                                      "order".counter,
                                                      "order".signature,
                                                      "order".salt,
                                                      "order".zone,
                                                      "order"."conduitKey",
                                                      "order"."protocolAddress",
                                                      "order"."cancelTxHash",
                                                      "order"."cancelLogIdx",
                                                      "order"."cancelTimestamp",
                                                      "order"."fulfillQuantity",
                                                      "order"."remainingQuantity",
                                                      "order"."perUnitPrice",
                                                      (SELECT array_agg(orders_items."tokenId")::text[] AS "tokenIds"
                                                       FROM orders_items orders_items
                                                       WHERE orders_items.hash = "order".hash) AS "tokenIds"
                    FROM active_orders_cache "order"
                    WHERE "order".type = 'BID'::order_type
                      AND ("order".currency = ANY
                           (ARRAY ['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, '7b79995e5f793a07bc00c21412e50ecae098e7f9'::bpchar]))
                      AND ("order"."endTime" > now() OR "order"."endTime" IS NULL)
                    ORDER BY "order".hash, "order"."perUnitPrice" DESC, "order".marketplace) "sellNow"
                   ON "sellNow"."collectionAddress" = item."collectionAddress" AND
                      ((item."tokenId"::text = ANY ("sellNow"."tokenIds")) OR "sellNow"."tokenIds" IS NULL)
         LEFT JOIN (SELECT DISTINCT ON ("order".hash) "order".hash,
                                                      "order"."userAddress",
                                                      "order"."collectionAddress",
                                                      "order".type,
                                                      "order".marketplace,
                                                      "order".price,
                                                      "order"."startingPrice",
                                                      "order".currency,
                                                      "order"."marketplaceFeeBps",
                                                      "order"."marketplaceFeeReceiver",
                                                      "order"."royaltiesBps",
                                                      "order"."startingRoyalties",
                                                      "order"."royaltiesReceiver",
                                                      "order"."startTime",
                                                      "order"."endTime",
                                                      "order".counter,
                                                      "order".signature,
                                                      "order".salt,
                                                      "order".zone,
                                                      "order"."conduitKey",
                                                      "order"."protocolAddress",
                                                      "order"."cancelTxHash",
                                                      "order"."cancelLogIdx",
                                                      "order"."cancelTimestamp",
                                                      "order"."fulfillQuantity",
                                                      "order"."remainingQuantity",
                                                      "order"."perUnitPrice",
                                                      (SELECT array_agg(orders_items."tokenId")::text[] AS "tokenIds"
                                                       FROM orders_items orders_items
                                                       WHERE orders_items.hash = "order".hash) AS "tokenIds"
                    FROM active_orders_cache "order"
                    WHERE "order".type = 'ENGLISH_AUCTION'::order_type
                      AND ("order".currency = ANY
                           (ARRAY ['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, '7b79995e5f793a07bc00c21412e50ecae098e7f9'::bpchar]))
                      AND ("order"."endTime" > now() OR "order"."endTime" IS NULL)
                    ORDER BY "order".hash, "order"."endTime", "order".marketplace) auction
                   ON auction."collectionAddress" = item."collectionAddress" AND
                      (item."tokenId"::text = ANY (auction."tokenIds"))
         LEFT JOIN (SELECT DISTINCT ON (sale."collectionAddress", sale."tokenId") sale."txHash",
                                                                                  sale."logIdx",
                                                                                  sale."collectionAddress",
                                                                                  sale."tokenId",
                                                                                  sale."orderHash",
                                                                                  sale.amount,
                                                                                  sale."from",
                                                                                  sale."to",
                                                                                  sale.price,
                                                                                  sale.currency,
                                                                                  sale.marketplace,
                                                                                  sale."timestamp",
                                                                                  sale."perUnitPrice"
                    FROM sales sale
                    ORDER BY sale."collectionAddress", sale."tokenId", sale."timestamp" DESC) "lastSale"
                   ON "lastSale"."collectionAddress" = item."collectionAddress" AND
                      "lastSale"."tokenId" = item."tokenId"
         LEFT JOIN (SELECT DISTINCT ON (transfer."collectionAddress", transfer."tokenId") transfer."txHash",
                                                                                          transfer."logIdx",
                                                                                          transfer."from",
                                                                                          transfer."to",
                                                                                          transfer."collectionAddress",
                                                                                          transfer."tokenId",
                                                                                          transfer.amount,
                                                                                          transfer.batch,
                                                                                          transfer."timestamp"
                    FROM transfers transfer
                    ORDER BY transfer."collectionAddress", transfer."tokenId", transfer."timestamp") mint
                   ON mint."collectionAddress" = item."collectionAddress" AND mint."tokenId" = item."tokenId"
         LEFT JOIN (SELECT DISTINCT ON (transfer."collectionAddress", transfer."tokenId") transfer."txHash",
                                                                                          transfer."logIdx",
                                                                                          transfer."from",
                                                                                          transfer."to",
                                                                                          transfer."collectionAddress",
                                                                                          transfer."tokenId",
                                                                                          transfer.amount,
                                                                                          transfer.batch,
                                                                                          transfer."timestamp"
                    FROM transfers transfer
                    ORDER BY transfer."collectionAddress", transfer."tokenId", transfer."timestamp" DESC) "lastTransfer"
                   ON "lastTransfer"."collectionAddress" = item."collectionAddress" AND
                      "lastTransfer"."tokenId" = item."tokenId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW "items_view"`);
    await queryRunner.query(
      `CREATE VIEW "items_view" AS SELECT DISTINCT ON ("item"."collectionAddress", "item"."tokenId") "item"."collectionAddress" AS "collectionAddress", "item"."tokenId" AS "tokenId", "item"."title" AS "title", "item"."description" AS "description", "item"."tokenUri" AS "tokenUri", "item"."numberOfCopies" AS "numberOfCopies", "item"."rarityRanking" AS "rarityRanking", "item"."rarityScore" AS "rarityScore", "item"."lastImport" AS "lastImport", CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END AS "rarityBasisPoints", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END AS "buyNowPrice", CASE WHEN "buyNow"."type" = 'DUTCH_AUCTION' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."perUnitPrice" END AS "buyNowPerUnitPrice", "buyNow"."startTime" AS "buyNowStartTime", "sellNow"."price" AS "sellNowPrice", "sellNow"."perUnitPrice" AS "sellNowPerUnitPrice", "sellNow"."startTime" AS "sellNowStartTime", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."perUnitPrice", "auction"."perUnitPrice") ELSE NULL END AS "auctionPerUnitPrice", CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END AS "auctionPrice", "auction"."endTime" AS "auctionEndTime", "lastSale"."price" AS "lastSalePrice", "lastSale"."timestamp" AS "lastSaleTimestamp", "mint"."timestamp" AS "mintTimestamp", "lastTransfer"."timestamp" AS "lastTransferTimestamp", (SELECT COUNT(*) FROM "likes" "like" WHERE "like"."collectionAddress" = "item"."collectionAddress" AND "like"."tokenId" = "item"."tokenId") AS "likeCount" FROM "items" "item" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "item"."collectionAddress"  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, CASE WHEN "order"."type" = 'DUTCH_AUCTION' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."perUnitPrice" END ASC, "order"."marketplace" ASC) "buyNow" ON "buyNow"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("buyNow"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'BID' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."perUnitPrice" DESC, "order"."marketplace" ASC) "sellNow" ON "sellNow"."collectionAddress" = "item"."collectionAddress" AND ("item"."tokenId"::TEXT = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)  LEFT JOIN (SELECT DISTINCT ON ("order"."hash") "order".*, (SELECT array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order" WHERE "order"."type" = 'ENGLISH_AUCTION' AND "order"."currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','7b79995e5f793a07bc00c21412e50ecae098e7f9') AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL) ORDER BY "order"."hash" ASC, "order"."endTime" ASC, "order"."marketplace" ASC) "auction" ON "auction"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("auction"."tokenIds")  LEFT JOIN (SELECT DISTINCT ON ("sale"."collectionAddress", "sale"."tokenId") * FROM "sales" "sale" ORDER BY "sale"."collectionAddress" ASC, "sale"."tokenId" ASC, "timestamp" DESC) "lastSale" ON "lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" ASC) "mint" ON "mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"  LEFT JOIN (SELECT DISTINCT ON ("transfer"."collectionAddress", "transfer"."tokenId") * FROM "transfers" "transfer" ORDER BY "transfer"."collectionAddress" ASC, "transfer"."tokenId" ASC, "timestamp" DESC) "lastTransfer" ON "lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId" ORDER BY "item"."collectionAddress" ASC, "item"."tokenId" ASC, "sellNow"."perUnitPrice" DESC`,
    );
  }
}
