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
exports.rewards1686218855822 = void 0;
class rewards1686218855822 {
    constructor() {
        this.name = 'rewards1686218855822';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "trading_rewards" ("user" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "buyAmount" numeric(78) NOT NULL, "sellAmount" numeric(78) NOT NULL, CONSTRAINT "PK_22e029b4e8363c42bc28c1f1ff0" PRIMARY KEY ("user", "date"))`);
            yield queryRunner.query(`CREATE TABLE "referral_rewards" ("user" character(40) NOT NULL, "date" date NOT NULL DEFAULT ('now'::text)::date, "referrer" character(40) NOT NULL, "referrerAmount" numeric(78) NOT NULL, "referredAmount" numeric(78) NOT NULL, CONSTRAINT "PK_15332389aaa619369deaf7358cf" PRIMARY KEY ("user", "date", "referrer"))`);
            yield queryRunner.query(`CREATE TABLE "staking_deposits" ("user" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_edac7a4e681cb67e0d302ed4903" PRIMARY KEY ("user", "timestamp"))`);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "buy_volumes" AS SELECT "to" AS "user", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'buy_volumes',
                'SELECT "to" AS "user", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "to", "currency", "date"',
            ]);
            yield queryRunner.query(`CREATE MATERIALIZED VIEW "sell_volumes" AS SELECT "from" AS "user", "currency", DATE_TRUNC('day', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'MATERIALIZED_VIEW',
                'sell_volumes',
                'SELECT "from" AS "user", "currency", DATE_TRUNC(\'day\', "timestamp")::DATE AS "date", SUM("price") AS "volume" FROM "sales" "sale" GROUP BY "from", "currency", "date"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'sell_volumes', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "sell_volumes"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['MATERIALIZED_VIEW', 'buy_volumes', 'public']);
            yield queryRunner.query(`DROP MATERIALIZED VIEW "buy_volumes"`);
            yield queryRunner.query(`DROP TABLE "staking_deposits"`);
            yield queryRunner.query(`DROP TABLE "referral_rewards"`);
            yield queryRunner.query(`DROP TABLE "trading_rewards"`);
        });
    }
}
exports.rewards1686218855822 = rewards1686218855822;
//# sourceMappingURL=1686218855822-rewards.js.map