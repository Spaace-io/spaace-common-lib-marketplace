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
exports.timescale1675359390155 = void 0;
class timescale1675359390155 {
    constructor() {
        this.name = 'timescale1675359390155';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "last_refresh" ("pk" boolean NOT NULL DEFAULT true, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_0b89981208a5ea032d8daed1bc" CHECK (pk = TRUE), CONSTRAINT "PK_0dc50ad411bca7361507c40d7e1" PRIMARY KEY ("pk"))`);
            yield queryRunner.query(`CREATE TABLE "transfers" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "from" character(40) NOT NULL, "to" character(40) NOT NULL, "collection" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_54ecc4c7a0d91741a58794a2fb7" PRIMARY KEY ("txHash", "logIdx", "from", "to", "collection", "tokenId"))`);
            yield queryRunner.query(`CREATE TABLE "sales" ("txHash" character(64) NOT NULL, "logIdx" integer NOT NULL, "orderHash" character(64) NOT NULL, "collection" character(40) NOT NULL, "tokenId" numeric(78) NOT NULL, "amount" numeric(78) NOT NULL DEFAULT '1', "from" character(40) NOT NULL, "to" character(40) NOT NULL, "price" numeric(78) NOT NULL, "currency" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e31fcbe59ec356142d99146c5ef" PRIMARY KEY ("txHash", "logIdx", "collection", "tokenId"))`);
            yield queryRunner.query(`ALTER TABLE "transfers" ADD CONSTRAINT "FK_5bb5a35d14dacbc693cbc088d5c" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd" FOREIGN KEY ("collection", "tokenId") REFERENCES "items"("collection","tokenId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`CREATE VIEW "volume24h" AS SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL '2 days' GROUP BY "collection", "currency", "bucket"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'volume24h',
                'SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL \'2 days\' GROUP BY "collection", "currency", "bucket"',
            ]);
            yield queryRunner.query(`CREATE VIEW "volume7d" AS SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (7 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL '14 days' GROUP BY "collection", "currency", "bucket"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'volume7d',
                'SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (7 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL \'14 days\' GROUP BY "collection", "currency", "bucket"',
            ]);
            yield queryRunner.query(`CREATE VIEW "volume30d" AS SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (30 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL '60 days' GROUP BY "collection", "currency", "bucket"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'volume30d',
                'SELECT "collection", "currency", FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (30 * 24 * 60 * 60)) AS "bucket", SUM("price") AS "volume" FROM "sales" "sale" WHERE "timestamp" > NOW() - INTERVAL \'60 days\' GROUP BY "collection", "currency", "bucket"',
            ]);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "balances" AS SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "sent" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "received" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0)`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'balances',
                'SELECT "received"."collection", "received"."tokenId", "received"."user", "received"."total" - COALESCE("sent"."total", 0) AS "balance" FROM (SELECT "collection", "tokenId", "to" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "to") "sent" LEFT JOIN (SELECT "collection", "tokenId", "from" AS "user", SUM("amount") AS "total" FROM "transfers" "transfer" GROUP BY "collection", "tokenId", "from") "received" ON "sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user" WHERE "received"."total" > COALESCE("sent"."total", 0)',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'balances', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "balances"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'volume30d', 'public']);
            yield queryRunner.query(`DROP VIEW "volume30d"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'volume7d', 'public']);
            yield queryRunner.query(`DROP VIEW "volume7d"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'volume24h', 'public']);
            yield queryRunner.query(`DROP VIEW "volume24h"`);
            yield queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_a5c8082f45cfe7587c8b10ffffd"`);
            yield queryRunner.query(`ALTER TABLE "transfers" DROP CONSTRAINT "FK_5bb5a35d14dacbc693cbc088d5c"`);
            yield queryRunner.query(`DROP TABLE "sales"`);
            yield queryRunner.query(`DROP TABLE "transfers"`);
            yield queryRunner.query(`DROP TABLE "last_refresh"`);
        });
    }
}
exports.timescale1675359390155 = timescale1675359390155;
//# sourceMappingURL=1675359390155-timescale.js.map