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
exports.auctions1691656623660 = void 0;
class auctions1691656623660 {
    constructor() {
        this.name = 'auctions1691656623660';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."order_type" AS ENUM('Ask', 'Bid', 'EnglishAuction', 'DutchAuction')`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "type" "public"."order_type"`);
            yield queryRunner.query(`UPDATE "orders" SET "type" = (case "isAsk" when true then 'Ask' else 'Bid' end)::"order_type"`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "type" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "isAsk"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "startingPrice" numeric(78)`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startingPrice"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "isAsk" boolean`);
            yield queryRunner.query(`UPDATE "orders" SET "isAsk" = "type" != 'Bid'`);
            yield queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "isAsk" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "type"`);
            yield queryRunner.query(`DROP TYPE "public"."order_type"`);
        });
    }
}
exports.auctions1691656623660 = auctions1691656623660;
//# sourceMappingURL=1691656623660-auctions.js.map