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
exports.balanceCollectionAddress1687423992421 = void 0;
class balanceCollectionAddress1687423992421 {
    constructor() {
        this.name = 'balanceCollectionAddress1687423992421';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_0b89981208a5ea032d8daed1bc"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5" CHECK ("pk" = TRUE)`);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collectionAddress", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'balances',
                'SELECT "received"."collectionAddress", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collectionAddress", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "to") "received" LEFT JOIN (SELECT "collectionAddress", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collectionAddress", "tokenId", "from") "sent" ON "sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != \'0000000000000000000000000000000000000000\'',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" DROP CONSTRAINT "CHK_502e27f4e8ff88c013b483e6f5"`);
            yield queryRunner.query(`ALTER TABLE "last_refresh" ADD CONSTRAINT "CHK_0b89981208a5ea032d8daed1bc" CHECK ((pk = true))`);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "received" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "sent" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'balances',
                'SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "received" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "sent" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."user" != \'0000000000000000000000000000000000000000\'',
            ]);
        });
    }
}
exports.balanceCollectionAddress1687423992421 = balanceCollectionAddress1687423992421;
//# sourceMappingURL=1687423992421-balanceCollectionAddress.js.map