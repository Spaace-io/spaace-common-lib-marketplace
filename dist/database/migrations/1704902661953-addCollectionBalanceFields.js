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
exports.AddCollectionBalanceFields1704902661953 = void 0;
class AddCollectionBalanceFields1704902661953 {
    constructor() {
        this.name = 'AddCollectionBalanceFields1704902661953';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collection_balances_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collection_balances_view"`);
            yield queryRunner.query(`CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collection_balances_view',
                'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", (SELECT "collection"."description" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "description", (SELECT "collection"."name" FROM "collections" "collection" WHERE "collection"."address" = "balance"."collectionAddress") AS "name", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collection_balances_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collection_balances_view"`);
            yield queryRunner.query(`CREATE VIEW "collection_balances_view" AS SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collection_balances_view',
                'SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", "balance"."balance" AS "balance", "balance"."itemCount" AS "itemCount", COALESCE("collection"."volume", 0) AS "volume", COALESCE("collection"."volume1h", 0) AS "volume1h", COALESCE("collection"."volume6h", 0) AS "volume6h", COALESCE("collection"."volume24h", 0) AS "volume24h", COALESCE("collection"."volume7d", 0) AS "volume7d", COALESCE("collection"."volume30d", 0) AS "volume30d", COALESCE("collection"."volume90d", 0) AS "volume90d" FROM (SELECT "balance"."collectionAddress" AS "collectionAddress", "balance"."userAddress" AS "userAddress", SUM("balance"."balance") AS "balance", COUNT(DISTINCT "balance"."tokenId") AS "itemCount" FROM "balances" "balance" WHERE "balance"."balance" > 0 GROUP BY "balance"."collectionAddress", "balance"."userAddress") "balance" LEFT JOIN "collection_rankings_cache" "collection" ON "collection"."address" = "balance"."collectionAddress"',
            ]);
        });
    }
}
exports.AddCollectionBalanceFields1704902661953 = AddCollectionBalanceFields1704902661953;
//# sourceMappingURL=1704902661953-addCollectionBalanceFields.js.map