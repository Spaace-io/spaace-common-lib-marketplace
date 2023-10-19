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
exports.PassiveStaking1697713055289 = void 0;
class PassiveStaking1697713055289 {
    constructor() {
        this.name = 'PassiveStaking1697713055289';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_rewards_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_rewards_view"`);
            yield queryRunner.query(`DROP TABLE "staking_rewards"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`CREATE TABLE "staking_harvests" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "pool" character(40) NOT NULL, "depositId" numeric(78) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4ad66b4ae348510c177b724b24f" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`CREATE TYPE "public"."staking_type" AS ENUM('PASSIVE', 'ACTIVE')`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "type" "public"."staking_type" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "vestingTypeId" numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "pool"`);
            yield queryRunner.query(`DROP TYPE "public"."staking_pool"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "pool" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" DROP NOT NULL`);
            yield queryRunner.query(`CREATE INDEX "IDX_c53bae28da13037f9a0b91ea2d" ON "staking_deposits" ("type") `);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
            ]);
            yield queryRunner.query(`CREATE VIEW "active_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'ACTIVE'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'active_staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'ACTIVE\'',
            ]);
            yield queryRunner.query(`CREATE VIEW "passive_staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = 'PASSIVE'`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'passive_staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."type" AS "type", "deposit"."pool" AS "pool", "deposit"."userAddress" AS "userAddress", "deposit"."vestingTypeId" AS "vestingTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit" WHERE "deposit"."type" = \'PASSIVE\'',
            ]);
            yield queryRunner.query(`CREATE VIEW "staking_harvests_view" AS SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_harvests_view',
                'SELECT "harvest"."txHash" AS "txHash", "harvest"."logIdx" AS "logIdx", "harvest"."userAddress" AS "userAddress", "harvest"."pool" AS "pool", "harvest"."depositId" AS "depositId", "harvest"."token" AS "token", "harvest"."amount" AS "amount", "harvest"."timestamp" AS "timestamp" FROM "staking_harvests" "harvest"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_harvests_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_harvests_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'passive_staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "passive_staking_deposits_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'active_staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "active_staking_deposits_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c53bae28da13037f9a0b91ea2d"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ALTER COLUMN "depositId" TYPE numeric(78,0)`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "pool"`);
            yield queryRunner.query(`CREATE TYPE "public"."staking_pool" AS ENUM('STANDARD_STAKING', 'COMPOUND_STAKING')`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" ADD "pool" "public"."staking_pool" NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "vestingTypeId"`);
            yield queryRunner.query(`ALTER TABLE "staking_deposits" DROP COLUMN "type"`);
            yield queryRunner.query(`DROP TYPE "public"."staking_type"`);
            yield queryRunner.query(`DROP TABLE "staking_harvests"`);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
            ]);
            yield queryRunner.query(`CREATE TABLE "staking_rewards" ("txHash" character(64) NOT NULL, "logIdx" numeric(78) NOT NULL, "userAddress" character(40) NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "pool" character(40) NOT NULL, "token" character(40) NOT NULL, "amount" numeric(78) NOT NULL, CONSTRAINT "PK_851c6379084b24f40772bedcc0f" PRIMARY KEY ("txHash", "logIdx"))`);
            yield queryRunner.query(`CREATE VIEW "staking_rewards_view" AS SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_rewards_view',
                'SELECT "reward"."txHash" AS "txHash", "reward"."logIdx" AS "logIdx", "reward"."userAddress" AS "userAddress", "reward"."pool" AS "pool", "reward"."depositId" AS "depositId", "reward"."token" AS "token", "reward"."amount" AS "amount", "reward"."timestamp" AS "timestamp" FROM "staking_rewards" "reward"',
            ]);
        });
    }
}
exports.PassiveStaking1697713055289 = PassiveStaking1697713055289;
//# sourceMappingURL=1697713055289-passiveStaking.js.map