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
exports.RoyaltiesReceiver1704276623923 = void 0;
class RoyaltiesReceiver1704276623923 {
    constructor() {
        this.name = 'RoyaltiesReceiver1704276623923';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'orders_view', 'public']);
            yield queryRunner.query(`DROP VIEW "orders_view"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "royaltiesReceiver" character(40)`);
            yield queryRunner.query(`ALTER TABLE "active_orders_cache" ADD "royaltiesReceiver" character(40)`);
            yield queryRunner.query(`CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'orders_view',
                'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", "order"."royaltiesReceiver" AS "royaltiesReceiver", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'orders_view', 'public']);
            yield queryRunner.query(`DROP VIEW "orders_view"`);
            yield queryRunner.query(`ALTER TABLE "active_orders_cache" DROP COLUMN "royaltiesReceiver"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "royaltiesReceiver"`);
            yield queryRunner.query(`CREATE VIEW "orders_view" AS SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'orders_view',
                'SELECT "order"."hash" AS "hash", "order"."userAddress" AS "userAddress", "order"."collectionAddress" AS "collectionAddress", "order"."tokenId" AS "tokenId", "order"."type" AS "type", "order"."marketplace" AS "marketplace", "order"."price" AS "price", "order"."startingPrice" AS "startingPrice", "order"."currency" AS "currency", "order"."startTime" AS "startTime", "order"."endTime" AS "endTime", "order"."counter" AS "counter", "order"."signature" AS "signature", "order"."cancelTxHash" AS "cancelTxHash", "order"."cancelLogIdx" AS "cancelLogIdx", "order"."cancelTimestamp" AS "cancelTimestamp", "order"."royalties" AS "royalties", "order"."startingRoyalties" AS "startingRoyalties", (SELECT EXISTS (SELECT 1 FROM "active_orders_cache" "active" WHERE "active"."hash" = "order"."hash" AND ("order"."endTime" > NOW() OR "order"."endTime" IS NULL)) FROM (SELECT 1 AS dummy_column) "dummy_table") AS "active" FROM "orders" "order"',
            ]);
        });
    }
}
exports.RoyaltiesReceiver1704276623923 = RoyaltiesReceiver1704276623923;
//# sourceMappingURL=1704276623923-royaltiesReceiver.js.map