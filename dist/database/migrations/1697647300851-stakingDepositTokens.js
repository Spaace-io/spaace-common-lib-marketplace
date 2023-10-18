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
exports.StakingDepositTokens1697647300851 = void 0;
class StakingDepositTokens1697647300851 {
    constructor() {
        this.name = 'StakingDepositTokens1697647300851';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."tokens" AS "tokens", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit"."txHash" AS "txHash", "deposit"."logIdx" AS "logIdx", "deposit"."userAddress" AS "userAddress", "deposit"."pool" AS "pool", "deposit"."depositId" AS "depositId", "deposit"."lockTypeId" AS "lockTypeId", "deposit"."shares" AS "shares", "deposit"."timestamp" AS "timestamp" FROM "staking_deposits" "deposit"',
            ]);
        });
    }
}
exports.StakingDepositTokens1697647300851 = StakingDepositTokens1697647300851;
//# sourceMappingURL=1697647300851-stakingDepositTokens.js.map