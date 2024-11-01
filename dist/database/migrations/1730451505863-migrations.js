"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrations1730451505863 = void 0;
class Migrations1730451505863 {
    constructor() {
        this.name = 'Migrations1730451505863';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'active_orders_cache_view', 'public']);
            yield queryRunner.query(`DROP VIEW "active_orders_cache_view"`);
            yield queryRunner.query(`CREATE VIEW "active_orders_cache_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'active_orders_cache_view',
                'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "active_orders_cache" "order"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'active_orders_cache_view', 'public']);
            yield queryRunner.query(`DROP VIEW "active_orders_cache_view"`);
            yield queryRunner.query(`CREATE VIEW "active_orders_cache_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'active_orders_cache_view',
                'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."marketplaceFeeBps" AS "marketplaceFeeBps", "order"."marketplaceFeeReceiver" AS "marketplaceFeeReceiver", "order"."royaltiesBps" AS "royaltiesBps", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."salt" AS "salt", "order"."zone" AS "zone", "order"."conduitKey" AS "conduitKey", "order"."protocolAddress" AS "protocolAddress", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."fulfillQuantity" AS "fulfillQuantity", "order"."remainingQuantity" AS "remainingQuantity", (SELECT array_agg("orders_items"."tokenId") as "tokenIds" FROM "orders_items" "orders_items" WHERE "orders_items"."hash" = "order"."hash") AS "tokenIds" FROM "orders" "order"',
            ]);
        });
    }
}
exports.Migrations1730451505863 = Migrations1730451505863;
//# sourceMappingURL=1730451505863-migrations.js.map