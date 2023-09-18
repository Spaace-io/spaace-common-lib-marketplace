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
exports.updateOrder1671153047294 = void 0;
class updateOrder1671153047294 {
    constructor() {
        this.name = 'updateOrder1671153047294';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "hash"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "signer"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "strategy"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tokenId"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "created_at"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updated_at"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "userAddress" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id", "userAddress")`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "price" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startTime"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "startTime" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "endTime"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "endTime" TIMESTAMP NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "endTime"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "endTime" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "startTime"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "startTime" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "price"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "price" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userAddress"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "updated_at" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "created_at" TIMESTAMP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "tokenId" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "strategy" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "signer" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "hash" character varying NOT NULL`);
        });
    }
}
exports.updateOrder1671153047294 = updateOrder1671153047294;
//# sourceMappingURL=1671153047294-updateOrder.js.map