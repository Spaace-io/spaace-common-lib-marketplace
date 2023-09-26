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
exports.OrderIndex1695743619694 = void 0;
class OrderIndex1695743619694 {
    constructor() {
        this.name = 'OrderIndex1695743619694';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE INDEX "IDX_f9f7fca055c5b1ace83d1fba2c" ON "orders" ("collectionAddress", "counter") `);
            yield queryRunner.query(`CREATE INDEX "IDX_f092505b4c45a9dc82a7e855b5" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'ENGLISH_AUCTION' AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`);
            yield queryRunner.query(`CREATE INDEX "IDX_fd92de5c964d496e88e82767fb" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" = 'BID' AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`);
            yield queryRunner.query(`CREATE INDEX "IDX_31a5b538b5ab55425ed9b27f47" ON "orders" ("collectionAddress", "tokenId", "endTime") WHERE "type" IN ('ASK', 'DUTCH_AUCTION') AND "cancelTimestamp" IS NULL AND "currency" IN ('0000000000000000000000000000000000000000', 'c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_31a5b538b5ab55425ed9b27f47"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_fd92de5c964d496e88e82767fb"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_f092505b4c45a9dc82a7e855b5"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_f9f7fca055c5b1ace83d1fba2c"`);
        });
    }
}
exports.OrderIndex1695743619694 = OrderIndex1695743619694;
//# sourceMappingURL=1695743619694-orderIndex.js.map