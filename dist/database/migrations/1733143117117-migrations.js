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
exports.Migrations1733143117117 = void 0;
class Migrations1733143117117 {
    constructor() {
        this.name = 'Migrations1733143117117';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collection_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collection_attributes_view"`);
            yield queryRunner.query(`CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS ((SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress")) AND "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collection_attributes_view',
                'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS ((SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress")) AND "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'collection_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "collection_attributes_view"`);
            yield queryRunner.query(`CREATE VIEW "collection_attributes_view" AS SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS (SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress") AND "order"."type" IN ('ASK', 'DUTCH_AUCTION') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'collection_attributes_view',
                'SELECT "attribute"."collectionAddress", "attribute"."traitHash" AS "traitHash", MIN("attribute"."trait") AS "trait", "attribute"."valueHash" AS "valueHash", MIN("attribute"."value") AS "value", COUNT(*) AS "itemCount", (SELECT COALESCE(COUNT(DISTINCT "order"."hash"), 0) FROM "active_orders_cache" "order" WHERE EXISTS (SELECT 1 FROM "orders_items" "orders_items" WHERE "orders_items"."tokenId" = ANY(array_agg("attribute"."tokenId")) AND "orders_items"."hash" = "order"."hash" AND "orders_items"."collectionAddress" = "attribute"."collectionAddress") AND "order"."type" IN (\'ASK\', \'DUTCH_AUCTION\') AND "order"."collectionAddress" = "attribute"."collectionAddress") AS "listedCount" FROM "item_attributes" "attribute" GROUP BY "attribute"."collectionAddress", "attribute"."traitHash", "attribute"."valueHash"',
            ]);
        });
    }
}
exports.Migrations1733143117117 = Migrations1733143117117;
//# sourceMappingURL=1733143117117-migrations.js.map