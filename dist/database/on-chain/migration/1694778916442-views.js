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
exports.Views1694778916442 = void 0;
class Views1694778916442 {
    constructor() {
        this.name = 'Views1694778916442';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'token_balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "token_balances"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'sell_volumes', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "sell_volumes"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'buy_volumes', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "buy_volumes"`);
            yield queryRunner.query(`CREATE VIEW "token_balances_view" AS SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'token_balances_view',
                'SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
            ]);
            yield queryRunner.query(`CREATE VIEW "balances_view" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'balances_view',
                'SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'balances_view', 'public']);
            yield queryRunner.query(`DROP VIEW "balances_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'token_balances_view', 'public']);
            yield queryRunner.query(`DROP VIEW "token_balances_view"`);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'balances',
                'SELECT "received"."collectionAddress", "received"."tokenId", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "userAddress", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
            ]);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "buy_volumes" AS SELECT "to" AS "userAddress", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'buy_volumes',
                'SELECT "to" AS "userAddress", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"',
            ]);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "sell_volumes" AS SELECT "from" AS "userAddress", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'sell_volumes',
                'SELECT "from" AS "userAddress", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"',
            ]);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "token_balances" AS SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'token_balances',
                'SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
            ]);
        });
    }
}
exports.Views1694778916442 = Views1694778916442;
//# sourceMappingURL=1694778916442-views.js.map