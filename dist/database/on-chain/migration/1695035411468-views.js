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
exports.Views1695035411468 = void 0;
class Views1695035411468 {
    constructor() {
        this.name = 'Views1695035411468';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE VIEW "distributor_rewards_view" AS SELECT "reward".* FROM "distributor_rewards" "reward"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'distributor_rewards_view',
                'SELECT "reward".* FROM "distributor_rewards" "reward"',
            ]);
            yield queryRunner.query(`CREATE VIEW "items_view" AS SELECT "item".* FROM "items" "item"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ['public', 'VIEW', 'items_view', 'SELECT "item".* FROM "items" "item"']);
            yield queryRunner.query(`CREATE VIEW "item_attributes_view" AS SELECT "attribute".* FROM "item_attributes" "attribute"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'item_attributes_view',
                'SELECT "attribute".* FROM "item_attributes" "attribute"',
            ]);
            yield queryRunner.query(`CREATE VIEW "orders_view" AS SELECT "order".* FROM "orders" "order"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'orders_view',
                'SELECT "order".* FROM "orders" "order"',
            ]);
            yield queryRunner.query(`CREATE VIEW "reward_periods_view" AS SELECT "period".* FROM "reward_periods" "period"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'reward_periods_view',
                'SELECT "period".* FROM "reward_periods" "period"',
            ]);
            yield queryRunner.query(`CREATE VIEW "sales_view" AS SELECT "sale".* FROM "sales" "sale"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ['public', 'VIEW', 'sales_view', 'SELECT "sale".* FROM "sales" "sale"']);
            yield queryRunner.query(`CREATE VIEW "staking_deposits_view" AS SELECT "deposit".* FROM "staking_deposits" "deposit"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_deposits_view',
                'SELECT "deposit".* FROM "staking_deposits" "deposit"',
            ]);
            yield queryRunner.query(`CREATE VIEW "staking_rewards_view" AS SELECT "reward".* FROM "staking_rewards" "reward"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'staking_rewards_view',
                'SELECT "reward".* FROM "staking_rewards" "reward"',
            ]);
            yield queryRunner.query(`CREATE VIEW "token_transfers_view" AS SELECT "transfer".* FROM "token_transfers" "transfer"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'token_transfers_view',
                'SELECT "transfer".* FROM "token_transfers" "transfer"',
            ]);
            yield queryRunner.query(`CREATE VIEW "transfers_view" AS SELECT "transfer".* FROM "transfers" "transfer"`);
            yield queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, [
                'public',
                'VIEW',
                'transfers_view',
                'SELECT "transfer".* FROM "transfers" "transfer"',
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'transfers_view', 'public']);
            yield queryRunner.query(`DROP VIEW "transfers_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'token_transfers_view', 'public']);
            yield queryRunner.query(`DROP VIEW "token_transfers_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_rewards_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_rewards_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'staking_deposits_view', 'public']);
            yield queryRunner.query(`DROP VIEW "staking_deposits_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'sales_view', 'public']);
            yield queryRunner.query(`DROP VIEW "sales_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'reward_periods_view', 'public']);
            yield queryRunner.query(`DROP VIEW "reward_periods_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'orders_view', 'public']);
            yield queryRunner.query(`DROP VIEW "orders_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'item_attributes_view', 'public']);
            yield queryRunner.query(`DROP VIEW "item_attributes_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'items_view', 'public']);
            yield queryRunner.query(`DROP VIEW "items_view"`);
            yield queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ['VIEW', 'distributor_rewards_view', 'public']);
            yield queryRunner.query(`DROP VIEW "distributor_rewards_view"`);
        });
    }
}
exports.Views1695035411468 = Views1695035411468;
//# sourceMappingURL=1695035411468-views.js.map