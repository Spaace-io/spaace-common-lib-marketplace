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
exports.tokenBalance1691415181110 = void 0;
class tokenBalance1691415181110 {
    constructor() {
        this.name = 'tokenBalance1691415181110';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_737f403a0dc0349952989dff4b"`);
            yield queryRunner.query(`CREATE TABLE "token_transfers" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "currency" character(40) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_577b7d4a5f8030441dcb95e9a7b" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "token_balances" AS SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> '0000000000000000000000000000000000000000'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'token_balances',
                'SELECT "received"."currency", "received"."userAddress", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "currency", "to" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "to") "received" LEFT JOIN (SELECT "currency", "from" AS "userAddress", SUM("amount") AS "total" FROM "token_transfers" "transfer" GROUP BY "currency", "from") "sent" ON "sent"."currency" = "received"."currency" AND "sent"."userAddress" = "received"."userAddress" WHERE "received"."total" > COALESCE("sent"."total", 0) AND "received"."userAddress" <> \'0000000000000000000000000000000000000000\'',
            ]);
            yield queryRunner.query(`CREATE INDEX "IDX_985e4f6c85bfb2ebac16a3908d" ON "token_balances" ("currency", "userAddress") `);
            yield queryRunner.query(`CREATE INDEX "IDX_b6530d290e993630ce3e1d3b0f" ON "balances" ("collectionAddress", "tokenId", "userAddress") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_b6530d290e993630ce3e1d3b0f"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_985e4f6c85bfb2ebac16a3908d"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'token_balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "token_balances"`);
            yield queryRunner.query(`DROP TABLE "token_transfers"`);
            yield queryRunner.query(`CREATE INDEX "IDX_737f403a0dc0349952989dff4b" ON "balances" ("collectionAddress", "tokenId") `);
        });
    }
}
exports.tokenBalance1691415181110 = tokenBalance1691415181110;
//# sourceMappingURL=1691415181110-tokenBalance.js.map