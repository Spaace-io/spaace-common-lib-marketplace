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
exports.orderUser1672428197603 = void 0;
class orderUser1672428197603 {
    constructor() {
        this.name = 'orderUser1672428197603';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("userAddress")`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "id"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "userAddress"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "orderHash" character(64) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_ba4700a944a033f4d97074cedfb" PRIMARY KEY ("orderHash")`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "user" character(40)`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b" FOREIGN KEY ("user") REFERENCES "users"("address") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_3385fd4a67d8e132499eb00aa6b"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "user"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_ba4700a944a033f4d97074cedfb"`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "orderHash"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "userAddress" character(40) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("userAddress")`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`);
            yield queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id", "userAddress")`);
        });
    }
}
exports.orderUser1672428197603 = orderUser1672428197603;
//# sourceMappingURL=1672428197603-orderUser.js.map