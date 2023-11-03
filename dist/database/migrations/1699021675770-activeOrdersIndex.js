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
exports.ActiveOrdersIndex1699021675770 = void 0;
class ActiveOrdersIndex1699021675770 {
    constructor() {
        this.name = 'ActiveOrdersIndex1699021675770';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_69f34fb128a167e9dd3eeada35"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_bf41fc975d409aa73fb34d2145"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_729615ba2ccd561e1c16766b2e"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_2434bfcac33f15ec25527d1e55"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_2b7accfb6b654afdee73448fa8"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_3908b1f7583e4f4cb3b29f54b8"`);
            yield queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9"`);
            yield queryRunner.query(`CREATE INDEX "IDX_e4c29e58b1e24afe6a420eac12" ON "token_transfers" ("timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_949ca1a8640dba9fde696bc9ed" ON "transfers" ("collectionAddress", "tokenId", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_48ff10123de1f12ad97d9389ec" ON "transfers" ("to", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_6ad30b2019d8c3c912e8ebcbad" ON "transfers" ("from", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d6446d8f923c6a64337de94a4f" ON "transfers" ("timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_41126261e9a22d2405c6ebde64" ON "staking_deposits" ("userAddress", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_c866abee7aaf01b4f6a6d6f006" ON "staking_deposits" ("pool", "userAddress", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_ada1107b0f23186413bec8efcf" ON "staking_harvests" ("pool", "token", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_d2549ba360e748e384808519f3" ON "staking_rewards" ("pool", "token", "timestamp") `);
            yield queryRunner.query(`CREATE INDEX "IDX_b7195f977f51ee35c43cda5000" ON "token_balances" ("userAddress", "currency", "balance") `);
            yield queryRunner.query(`CREATE INDEX "IDX_7a4d4751963a565d8085df2759" ON "token_balances" ("currency", "balance") `);
            yield queryRunner.query(`CREATE INDEX "IDX_0f54ad337df477893cd474b5b7" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NOT NULL`);
            yield queryRunner.query(`CREATE INDEX "IDX_e12796feacc86a1415cb0828d0" ON "distributor_rewards" ("userAddress", "distributor", "amount") WHERE "harvestTimestamp" IS NULL`);
            yield queryRunner.query(`CREATE INDEX "IDX_7e703d89736f55eee5b6fa68c2" ON "seasons" ("startTime") `);
            yield queryRunner.query(`CREATE INDEX "IDX_ed3f26097caa408923b69e5ab2" ON "season_ranks" ("seasonNumber", "threshold") `);
            yield queryRunner.query(`CREATE INDEX "IDX_70dee80d600300da49dd4d1e34" ON "user_loyalties" ("seasonNumber", "points") `);
            yield queryRunner.query(`CREATE INDEX "IDX_2ef2260573a9244e2eb7208341" ON "user_quest_progress" ("userAddress", "seasonNumber", "questId") WHERE "completed"`);
            yield queryRunner.query(`CREATE UNIQUE INDEX "IDX_dd8b4ee8d658dbbc0a9360f28b" ON "likes" ("userAddress", "collectionAddress", "tokenId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_8ed45072a9e39ff1391ae246e1" ON "active_orders_cache" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
            yield queryRunner.query(`CREATE INDEX "IDX_119c6a5e12f2f9347445ab07a8" ON "active_orders_cache" ("collectionAddress", "tokenId", "price") WHERE "type" = 'BID' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
            yield queryRunner.query(`CREATE INDEX "IDX_7119911fb9fe2c7c51578ae1c1" ON "active_orders_cache" ("collectionAddress", "tokenId", "price") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
            yield queryRunner.query(`CREATE INDEX "IDX_d23cb3f7eb7a17a46f5c29e011" ON "active_orders_cache" ("collectionAddress", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
            yield queryRunner.query(`CREATE INDEX "IDX_d2a4a3b0511ca729ab2d5d6f3d" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" = 'BID' AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
            yield queryRunner.query(`CREATE INDEX "IDX_3a7c9cce7ff4a3f40880752c8e" ON "active_orders_cache" ("collectionAddress", "price") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "currency" IN ('0000000000000000000000000000000000000000','c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2','b4fbf271143f4fbf7b91a5ded31805e42b2208d6')`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_3a7c9cce7ff4a3f40880752c8e"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d2a4a3b0511ca729ab2d5d6f3d"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d23cb3f7eb7a17a46f5c29e011"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7119911fb9fe2c7c51578ae1c1"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_119c6a5e12f2f9347445ab07a8"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_8ed45072a9e39ff1391ae246e1"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_dd8b4ee8d658dbbc0a9360f28b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_2ef2260573a9244e2eb7208341"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_70dee80d600300da49dd4d1e34"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_ed3f26097caa408923b69e5ab2"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7e703d89736f55eee5b6fa68c2"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_e12796feacc86a1415cb0828d0"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_0f54ad337df477893cd474b5b7"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7a4d4751963a565d8085df2759"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_b7195f977f51ee35c43cda5000"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d2549ba360e748e384808519f3"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_ada1107b0f23186413bec8efcf"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_c866abee7aaf01b4f6a6d6f006"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_41126261e9a22d2405c6ebde64"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_d6446d8f923c6a64337de94a4f"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_6ad30b2019d8c3c912e8ebcbad"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_48ff10123de1f12ad97d9389ec"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_949ca1a8640dba9fde696bc9ed"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_e4c29e58b1e24afe6a420eac12"`);
            yield queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "UQ_dd8b4ee8d658dbbc0a9360f28b9" UNIQUE ("userAddress", "collectionAddress", "tokenId")`);
            yield queryRunner.query(`CREATE INDEX "IDX_3908b1f7583e4f4cb3b29f54b8" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = 'ENGLISH_AUCTION'::order_type) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`);
            yield queryRunner.query(`CREATE INDEX "IDX_2b7accfb6b654afdee73448fa8" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = 'BID'::order_type) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`);
            yield queryRunner.query(`CREATE INDEX "IDX_2434bfcac33f15ec25527d1e55" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE ((type = ANY (ARRAY['ASK'::order_type, 'DUTCH_AUCTION'::order_type])) AND ("cancelTimestamp" IS NULL) AND (currency = ANY (ARRAY['0000000000000000000000000000000000000000'::bpchar, 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'::bpchar, 'b4fbf271143f4fbf7b91a5ded31805e42b2208d6'::bpchar])))`);
            yield queryRunner.query(`CREATE INDEX "IDX_729615ba2ccd561e1c16766b2e" ON "transfers" ("collectionAddress", "tokenId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_bf41fc975d409aa73fb34d2145" ON "transfers" ("from", "collectionAddress", "tokenId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_69f34fb128a167e9dd3eeada35" ON "transfers" ("to", "collectionAddress", "tokenId") `);
        });
    }
}
exports.ActiveOrdersIndex1699021675770 = ActiveOrdersIndex1699021675770;
//# sourceMappingURL=1699021675770-activeOrdersIndex.js.map