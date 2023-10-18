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
exports.Staking1697641290191 = void 0;
class Staking1697641290191 {
    constructor() {
        this.name = 'Staking1697641290191';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_rewards_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_rewards_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "amount"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "depositId" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "lockTypeId" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "shares" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "tokens" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" ADD "depositId" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "pool"`);
            yield queryRunner.query(`CREATE TYPE "public"."staking_pool" AS ENUM('STANDARD_STAKING', 'COMPOUND_STAKING')`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "pool" "public"."staking_pool" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" DROP COLUMN "pool"`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" ADD "pool" "public"."staking_pool" NOT NULL`);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
            ]);
            yield queryRunner.query(`CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_rewards_view',
                'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_rewards_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_rewards_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" DROP COLUMN "pool"`);
            yield queryRunner.query(`DROP TYPE "public"."staking_pool"`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" ADD "pool" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "pool"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "pool" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_rewards" DROP COLUMN "depositId"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "tokens"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "shares"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "lockTypeId"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "depositId"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "amount" numeric(78,0) NOT NULL`);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."timestamp" AS "timestamp", "deposit"."pool" AS "pool", "deposit"."amount" AS "amount" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."timestamp" AS "timestamp", "deposit"."pool" AS "pool", "deposit"."amount" AS "amount" FROM "staking_deposits" "deposit"',
            ]);
            yield queryRunner.query(`CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."timestamp" AS "timestamp", "reward"."pool" AS "pool", "reward"."token" AS "token", "reward"."amount" AS "amount" FROM "staking_rewards" "reward"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_rewards_view',
                'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."timestamp" AS "timestamp", "reward"."pool" AS "pool", "reward"."token" AS "token", "reward"."amount" AS "amount" FROM "staking_rewards" "reward"',
            ]);
        });
    }
}
exports.Staking1697641290191 = Staking1697641290191;
//# sourceMappingURL=1697641290191-staking.js.map